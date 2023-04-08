package zensayyy.fm.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;

@Component
@Slf4j
public class WsMixer extends BinaryWebSocketHandler {
  @Override
  public void handleBinaryMessage(WebSocketSession session,
                                  BinaryMessage message) {
    return;
  }

  @Override
  public void afterConnectionEstablished(WebSocketSession session) {
    log.info("Connection established: {}",session.getId());
  }

}
