package zensayyy.fm;

import com.google.protobuf.InvalidProtocolBufferException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;
import zensayyy.fm.broker.MessagesBroker;
import zensayyy.fm.proto.Control.ControlMessage;
import zensayyy.fm.proto.Control.StreamT;
import zensayyy.fm.proto.Stream.ClipMetadata;
import zensayyy.fm.proto.Stream.StreamAction;
import zensayyy.fm.proto.Stream.StreamJoin;
import zensayyy.fm.proto.Stream.StreamMessage;
import zensayyy.fm.proto.Stream.StreamUpdate;
import zensayyy.fm.yt.YTPlayer;

@Component
@Slf4j
public class FmControlHandler extends BinaryWebSocketHandler {
  @Autowired private MessagesBroker messagesBroker;

  @Autowired private YTPlayer ytPlayer;

  private void addVideo(String id, StreamJoin streamJoin, String title,
                        String description) {
    ytPlayer.queryLatestVersion.setVideoId(id);
    var some = ytPlayer.queryLatestVersion.query();
    messagesBroker.addStreamUpdate(
        streamJoin, StreamUpdate.newBuilder()
                        .setUpcoming(ClipMetadata.newBuilder()
                                         .setSrc(some.getUrl())
                                         .setThumbnail(some.getThumbnail())
                                         .setTitle(title)
                                         .setDescription(description)
                                         .build())
                        .build());
  }

  private void handleStream(StreamJoin id, StreamAction action,
                            StreamT update) {
    switch (action) {
    case ADD:
      addVideo(update.getVideoId(), id, update.getTitle(), update.getDescription());
      break;
    case FRESH:
      log.warn("Action {} not implemented for {}", action, update);
      break;
    default:
      log.warn("Unknown action {}", action);
    }
  }

  @Override
  public void handleBinaryMessage(WebSocketSession session,
                                  BinaryMessage message) {
    try {
      ControlMessage streamMessage =
          ControlMessage.parseFrom(message.getPayload());
      switch (streamMessage.getMessageCase()) {
      case STREAM:
        var stream = streamMessage.getStream();
        handleStream(streamMessage.getId(), stream.getAction(), stream);
        break;
      default:
        log.warn("Unknown message {}", streamMessage);
      }
    } catch (InvalidProtocolBufferException e) {
      log.error("Error parsing message {}", e);
    }
  }
}
