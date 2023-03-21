package zensayyy.fm;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import zensayyy.fm.broker.MessagesBroker;
import zensayyy.fm.proto.Stream.ClipMetadata;
import zensayyy.fm.proto.Stream.StreamJoin;
import zensayyy.fm.proto.Stream.StreamUpdate;
import zensayyy.fm.yt.YTPlayer;

@SpringBootApplication
public class FmApplication {

  @Autowired private YTPlayer ytPlayer;
  @Autowired private MessagesBroker messagesBroker;

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

  @PostConstruct
  private void setSomeData() {
    YTPlayer.init();
    StreamJoin main = StreamJoin.newBuilder().setStreamId("yt_stream").build();
    messagesBroker.addStream(main);

    addVideo("DCkJ5lGPqFs", main, "Out of Touch", "Daryl Hall & John Oates");
    addVideo("Lo2qQmj0_h4", main, "You Shooke Me All Night long", "AC/DC");
  }

  public static void main(String[] args) {
    SpringApplication.run(FmApplication.class, args);
  }
}
