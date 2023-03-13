package zensayyy.fm.yt.api;

import java.io.IOException;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.schabi.newpipe.extractor.ServiceList;
import org.schabi.newpipe.extractor.exceptions.ExtractionException;
import org.schabi.newpipe.extractor.services.youtube.YoutubeService;
import org.schabi.newpipe.extractor.services.youtube.extractors.YoutubeStreamExtractor;
import org.springframework.stereotype.Component;
import zensayyy.fm.yt.api.types.LatestVersion;

@Component
@Slf4j
public class QueryLatestVersion implements ApiIfc<LatestVersion> {

  static final int ITAG = 140;

  private YoutubeService YTService = ServiceList.YouTube;
  private String videoId;

  public void setVideoId(String videoId) { this.videoId = videoId; }

  public LatestVersion query() {
    try {

      YoutubeStreamExtractor YTStreamExtractor;
      var url = YTService.getStreamLHFactory().fromId(videoId);
      YTStreamExtractor =
          (YoutubeStreamExtractor)YTService.getStreamExtractor(url);
      log.info("QueryLatestVersion for {}", YTStreamExtractor.getUrl());
      YTStreamExtractor.fetchPage();
      var audioStreams = YTStreamExtractor.getAudioStreams();
      var results = audioStreams.stream()
                        .filter((audio) -> audio.getItag() == 140)
                        .collect(Collectors.toList());
      log.info("QueryLatestVersion for {} resulted in {}", videoId,
               results.get(0).getContent());

      LatestVersion latestVersion = new LatestVersion();
      latestVersion.setUrl(results.get(0).getContent());
      latestVersion.setThumbnail(YTStreamExtractor.getThumbnailUrl());
      return latestVersion;
    } catch (IOException | ExtractionException e) {
      log.error("QueryLatestVersion for {} resulted in an error", videoId, e);
    }
    return new LatestVersion();
  }
}
