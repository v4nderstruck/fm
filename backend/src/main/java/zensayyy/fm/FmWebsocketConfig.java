package zensayyy.fm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class FmWebsocketConfig implements WebSocketConfigurer {

  @Autowired private FmStreamHandler fmStreamHandler;
  @Autowired private FmControlHandler fmControlHandler;

  @Override
  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    registry.addHandler(fmStreamHandler, "/live").setAllowedOriginPatterns("*");
    registry.addHandler(fmControlHandler, "/control")
        .setAllowedOriginPatterns("*");
  }
}
