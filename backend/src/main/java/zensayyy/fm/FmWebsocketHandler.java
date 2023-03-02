package zensayyy.fm;

import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class FmWebsocketHandler extends BinaryWebSocketHandler {
    
    @Override
    public void handleBinaryMessage(WebSocketSession session, BinaryMessage message) {
        log.info("Received message: {}", message);
    }
    
    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        log.info("Connection established: {}", session);
    }
}
