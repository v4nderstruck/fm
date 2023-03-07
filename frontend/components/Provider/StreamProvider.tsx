import { ClipMetadata, StreamAction, StreamJoin, StreamMessage } from "@/types/protocol/Stream";
import { createContext, useEffect, useState } from "react";
import { ReadyState } from "react-use-websocket";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

const WS_URL = "ws://localhost:8001/live"; // development endpoint

export interface StreamProviderProps {
    children: React.ReactNode;
}

const StreamContext = createContext<ClipMetadata[]>([]);

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
    const {sendMessage, lastMessage, readyState} = useWebSocket(WS_URL, {
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
            const joinMsg = StreamMessage.create({
                action: StreamAction.FRESH,
                join: StreamJoin.create({ streamId: "yt_stream" }),
            });
            sendMessage(StreamMessage.encode(joinMsg).finish());
            console.log("Sended join message ", joinMsg);
        }
    }, [sendMessage, readyState]);

    useEffect(() => {
        if (!lastMessage) return;
        const streamMsg = StreamMessage.decode(lastMessage.data);

        if (streamMsg.update) {
            console.log("Received update ", streamMsg.update);
        } else if (streamMsg.updateSummary) {
            console.log("Received UpdateSummary ", streamMsg.updateSummary);
        }

    }, [lastMessage, sendMessage]);

    return (
        <StreamContext.Provider value={streamMetadata}>
            {children}
        </StreamContext.Provider>
    )
}
export { StreamContext, StreamProvider };