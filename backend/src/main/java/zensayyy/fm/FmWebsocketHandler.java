package zensayyy.fm;

import java.io.IOException;

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
        String videoId = new String(message.getPayload().array());
        log.info("Received message: {}", videoId);

        
        ytPlayer.queryLatestVersion.setVideoId(videoId);
        String url = ytPlayer.queryLatestVersion.query();
        
        try {
            session.sendMessage(new BinaryMessage(url.getBytes()));
        } catch(IOException e) {
            log.error("Error sending message: {}", e);
        }
    }
    
    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        log.info("Connection established: {}", session);
    }
}
