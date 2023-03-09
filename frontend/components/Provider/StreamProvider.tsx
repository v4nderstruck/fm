import { ClipMetadata, StreamAction, StreamJoin, StreamMessage } from "@/types/protocol/Stream";
import { createContext, useEffect, useState } from "react";
import { ReadyState } from "react-use-websocket";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

const WS_URL = "ws://localhost:8001/live"; // development endpoint

export interface StreamProviderProps {
    children: React.ReactNode;
}

type StreamContextType = {
    streamMetadata: ClipMetadata[];
    setStreamMetadata: React.Dispatch<React.SetStateAction<ClipMetadata[]>>;
}

const StreamContext = createContext<StreamContextType | null>(null);

const openHandler = () => {
    console.log("Connected to live server");
};

const closeHandler = () => {
    console.log("Disconnected from live server");
};

const errorHandler = (event: WebSocketEventMap["error"]) => {
    console.log("Error on live server connection ", event);
};

function StreamProvider({ children }: StreamProviderProps) {
    const [streamMetadata, setStreamMetadata] = useState<ClipMetadata[]>([]);
    const {sendMessage, lastMessage, readyState, getWebSocket} = useWebSocket(WS_URL, {
        onOpen: openHandler,
        onClose: closeHandler,
        onError: errorHandler,
        shouldReconnect: (closeEvent) => true,
        reconnectInterval: 5000,
        reconnectAttempts: 5,
        share: true,
    });

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

    useEffect(() => {
        if (!lastMessage) return;
        const streamMsg = StreamMessage.decode(new Uint8Array(lastMessage.data as ArrayBuffer));

        if (streamMsg.update) {
            console.log("Received update ", streamMsg.update);
        } else if (streamMsg.updateSummary) {
            console.log("Received UpdateSummary ", streamMsg.updateSummary);
            if (streamMsg.action == StreamAction.FRESH)
                setStreamMetadata(
                    streamMsg.updateSummary.updates
                        .filter((update) => update.upcoming != undefined && true)
                        .map((update) => update.upcoming!)
                );
        }

    }, [lastMessage, sendMessage]);

    return (
        <StreamContext.Provider value={{streamMetadata: streamMetadata, setStreamMetadata: setStreamMetadata}}>
            {children}
        </StreamContext.Provider>
    )
}
export { StreamContext, StreamProvider };