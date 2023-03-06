package zensayyy.fm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.annotation.PostConstruct;
import zensayyy.fm.broker.Broker;
import zensayyy.fm.broker.MessagesBroker;
import zensayyy.fm.proto.Stream.ClipMetadata;
import zensayyy.fm.proto.Stream.StreamJoin;
import zensayyy.fm.proto.Stream.StreamUpdate;
import zensayyy.fm.yt.YTPlayer;

@SpringBootApplication
public class FmApplication {

	@Autowired
	private YTPlayer ytPlayer;
	@Autowired
	private MessagesBroker messagesBroker;

	private void addVideo(String id, StreamJoin streamJoin, String title, String description) {
		ytPlayer.queryLatestVersion.setVideoId("TvZskcqdYcE");
		String some = ytPlayer.queryLatestVersion.query();
		messagesBroker.addStreamUpdate(streamJoin, StreamUpdate.newBuilder()
			.setUpcoming( ClipMetadata.newBuilder()
				.setSrc(some)
				.setTitle(title)
				.setDescription(description)
				.build()
			)
			.build());
	}

	@PostConstruct
	private void setSomeData() {
		StreamJoin main = StreamJoin.newBuilder()
				.setStreamId("yt_stream")
				.build();
		messagesBroker.addStream(main);

		addVideo("TvZskcqdYcE", main, "FM84", "Running in the Night");	
		addVideo("qFNOx2PczMo", main, "Caitlin Myers", "Fly Me to the Moon");	
	}

	public static void main(String[] args) {
		SpringApplication.run(FmApplication.class, args);
	}

}
