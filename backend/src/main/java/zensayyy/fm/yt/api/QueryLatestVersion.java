package zensayyy.fm.yt.api;

import java.io.IOException;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.schabi.newpipe.extractor.ServiceList;
import org.schabi.newpipe.extractor.exceptions.ExtractionException;
import org.schabi.newpipe.extractor.services.youtube.YoutubeService;
import org.schabi.newpipe.extractor.services.youtube.extractors.YoutubeStreamExtractor;
import org.springframework.stereotype.Component;
import zensayyy.fm.proto.TrackOuterClass.TrackMetadata;

@Component
@Slf4j
public class QueryLatestVersion implements ApiIfc<TrackMetadata> {

  static final int ITAG = 140;
  private YoutubeService YTService = ServiceList.YouTube;
  private String videoId;
  public void setVideoId(String videoId) { this.videoId = videoId; }

  public TrackMetadata query() {
    try {
      YoutubeStreamExtractor YTStreamExtractor;
      var url = YTService.getStreamLHFactory().fromId(videoId);
      YTStreamExtractor =
          (YoutubeStreamExtractor)YTService.getStreamExtractor(url);
      YTStreamExtractor.fetchPage();
      var audioStreams = YTStreamExtractor.getAudioStreams();
      var results = audioStreams.stream()
                        .filter((audio) -> audio.getItag() == 140)
                        .collect(Collectors.toList());
      TrackMetadata metadata =
          TrackMetadata.newBuilder()
              .setTrackId(this.videoId)
              .setThumbnail(YTStreamExtractor.getThumbnailUrl())
              .setTitle(YTStreamExtractor.getName())
              .setArtist(YTStreamExtractor.getUploaderName())
              .setSource(results.get(0).getContent())
              .build();
      return metadata;
    } catch (IOException | ExtractionException e) {
      log.error("QueryLatestVersion for {} resulted in an error", videoId, e);
    }
    return null;
  }
}
