package zensayyy.fm;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;

import com.google.protobuf.InvalidProtocolBufferException;

import lombok.extern.slf4j.Slf4j;
import zensayyy.fm.broker.MessagesBroker;
import zensayyy.fm.proto.Stream.StreamMessage;
import zensayyy.fm.yt.YTPlayer;

@Component
@Slf4j
public class FmWebsocketHandler extends BinaryWebSocketHandler {
    
    @Autowired
    private YTPlayer ytPlayer;

    @Autowired
    private MessagesBroker messagesBroker;

    @Override
    public void handleBinaryMessage(WebSocketSession session, BinaryMessage message) {
        try {
            StreamMessage streamMessage = StreamMessage.parseFrom(message.getPayload());
            switch(streamMessage.getMessageCase()) {
                case JOIN: 
                    log.info("Join Message for stream {} form session {}", streamMessage.getJoin().getStreamId(), session.getId());
                    messagesBroker.addSession(streamMessage.getJoin(), session);
                    break;
                default:
                case MESSAGE_NOT_SET:
                    log.error("No valid message received from {}", session.getId());
            } 
        } catch (InvalidProtocolBufferException e) {
            log.error("Error parsing message {}", e);
        } 
    }
    
    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        log.info("Connection established: {}", session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        messagesBroker.removeSession(session);
        log.info("Connection closed: {}", session);
    }
}
