import { ClipMetadata, StreamAction, StreamJoin, StreamMessage } from "@/types/protocol/Stream";
import { createContext, useEffect, useReducer, useState } from "react";
import { ReadyState } from "react-use-websocket";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

const WS_URL = "ws://localhost:8001/live"; // development endpoint

export interface StreamProviderProps {
  children: React.ReactNode;
}

export type StreamContextType = { state: StreamReducerState, dispatch: (action: StreamReducerAction) => void };
const StreamContext = createContext<StreamContextType>({
  state: { clips: [] },
  dispatch: () => { }
});

const openHandler = () => {
  console.log("Connected to live server");
};

const closeHandler = () => {
  console.log("Disconnected from live server");
};

const errorHandler = (event: WebSocketEventMap["error"]) => {
  console.log("Error on live server connection ", event);
};

export type StreamReducerAction = { type: "nextClip" } |
{ type: "set", state: StreamReducerState };
export type StreamReducerState = { clips: ClipMetadata[] };

function streamReducer(state: StreamReducerState, action: StreamReducerAction) {
  switch (action.type) {
    case "nextClip":
      return {
        clips: state.clips.slice(1)
      }
    case "set":
      return action.state;
  }
}


function StreamProvider({ children }: StreamProviderProps) {

  const [streamData, streamDispatch] = useReducer(streamReducer, { clips: [] } as StreamReducerState);

  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(WS_URL, {
    onOpen: openHandler,
    onClose: closeHandler,
    onError: errorHandler,
    shouldReconnect: (closeEvent) => true,
    reconnectInterval: 5000,
    reconnectAttempts: 5,
    share: true,
  });

  // set initial stream settings and send a joinMsg
  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      const websocket = getWebSocket();
      if (websocket) (websocket as WebSocket).binaryType = "arraybuffer";
      const joinMsg = StreamMessage.create({
        action: StreamAction.FRESH,
        join: StreamJoin.create({ streamId: "yt_stream" }),
      });
      sendMessage(StreamMessage.encode(joinMsg).finish());
      console.log("Sended join message ", joinMsg);
    }
  }, [sendMessage, readyState, getWebSocket]);


  // add new clips to the stream
  useEffect(() => {
    if (!lastMessage) return;
    const streamMsg = StreamMessage.decode(new Uint8Array(lastMessage.data as ArrayBuffer));

    if (streamMsg.update) {
      console.log("Received update ", streamMsg.update);
    } else if (streamMsg.updateSummary) {
      console.log("Received UpdateSummary ", streamMsg.updateSummary);
      if (streamMsg.action == StreamAction.FRESH) {
        let dispatch: StreamReducerAction = {
          type: "set",
          state: {
            clips: streamMsg.updateSummary.updates
              .filter((update) => update.upcoming != undefined && true)
              .map((update) => update.upcoming!)
          }
        };
        streamDispatch(dispatch);
      }
    }
  }, [lastMessage, sendMessage]);

  return (
    <StreamContext.Provider value={{ state: streamData, dispatch: streamDispatch }}>
      {children}
    </StreamContext.Provider>
  )
}
export { StreamContext, StreamProvider };
