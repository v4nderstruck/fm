package zensayyy.fm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;

import lombok.extern.slf4j.Slf4j;
import zensayyy.fm.yt.YTPlayer;
import zensayyy.fm.yt.api.QueryLatestVersion;

@Component
@Slf4j
public class FmWebsocketHandler extends BinaryWebSocketHandler {
    
    @Autowired
    private YTPlayer ytPlayer;

    @Override
    public void handleBinaryMessage(WebSocketSession session, BinaryMessage message) {
        log.info("Received message: {}", message);

        ytPlayer.queryLatestVersion.setVideoId("TvZskcqdYcE");
        ytPlayer.queryLatestVersion.query();
        log.info("Query done");
    }
    
    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        log.info("Connection established: {}", session);
    }
}
