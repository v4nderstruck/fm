import { ClipMetadata, StreamAction, StreamJoin, StreamMessage } from "@/types/protocol/Stream";
import { createContext, useEffect, useReducer, useState } from "react";
import { ReadyState } from "react-use-websocket";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

const WS_URL = "ws://localhost:8001/live"; // development endpoint

export interface StreamProviderProps {
  children: React.ReactNode;
}

export type StreamRenderer = {
  textColorA: string;
  textColorB: string;
}


export type StreamReducerState = {
  clips: ClipMetadata[],
  render: StreamRenderer
};

export type StreamContextType = {
  state: StreamReducerState,
  dispatch: (action: StreamReducerAction) => void
};
const StreamContext = createContext<StreamContextType>({
  state: { clips: [], render: { textColorA: "#fff", textColorB: "#fff" } },
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

export type StreamReducerAction =
  { type: "nextClip" } |
  { type: "set", state: StreamReducerState } |
  { type: "add", clip: ClipMetadata } |
  { type: "render", render: StreamRenderer };



function streamReducer(state: StreamReducerState, action: StreamReducerAction) {
  switch (action.type) {
    case "nextClip":
      return {
        ...state,
        clips: state.clips.slice(1)
      }
    case "set":
      return action.state;
    case "add":
      return {
        ...state,
        clips: [...state.clips, action.clip]
      }
    case "render":
      return {
        ...state,
        render: action.render 
      }
  }
}


function StreamProvider({ children }: StreamProviderProps) {

  const [streamData, streamDispatch] = useReducer(streamReducer,
    {
      clips: [],
      render: { textColorA: "#fff", textColorB: "#fff" },
    } as StreamReducerState
  );

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

      let dispatch: StreamReducerAction = {
        type: "add",
        clip: streamMsg.update.upcoming!
      };

      streamDispatch(dispatch);

    } else if (streamMsg.updateSummary) {
      console.log("Received UpdateSummary ", streamMsg.updateSummary);
      if (streamMsg.action == StreamAction.FRESH) {
        let dispatch: StreamReducerAction = {
          type: "set",
          state: {
            render: { textColorA: "#fff", textColorB: "#fff" },
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
