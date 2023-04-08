package zensayyy.fm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import zensayyy.fm.services.WsMixer;

@Configuration
@EnableWebSocket
public class WsConfig implements WebSocketConfigurer {
  @Autowired private WsMixer wsMixer;
  @Override
  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) { 
    registry.addHandler(wsMixer, "/mixer").setAllowedOrigins("*"); 
  }
}
