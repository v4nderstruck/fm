package zensayyy.fm.yt.api;

import java.io.IOException;

import org.schabi.newpipe.extractor.NewPipe;
import org.schabi.newpipe.extractor.ServiceList;
import org.schabi.newpipe.extractor.exceptions.ExtractionException;
import org.schabi.newpipe.extractor.services.youtube.YoutubeJavaScriptExtractor;
import org.schabi.newpipe.extractor.services.youtube.extractors.YoutubeStreamExtractor;
import org.schabi.newpipe.extractor.services.youtube.linkHandler.YoutubeStreamLinkHandlerFactory;
import org.schabi.newpipe.extractor.stream.StreamExtractor;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;
import zensayyy.fm.yt.NewPipeDownloader;

@Component
@Slf4j
public class QueryLatestVersion implements ApiIfc<String> {

    private String videoId;

    public void setVideoId(String videoId) {
        this.videoId = videoId;
    }

    public String query() {
        try {
            var YtService = ServiceList.YouTube;
            YoutubeStreamExtractor YTStreamExtractor;
            var url = YtService.getStreamLHFactory().fromId(videoId);
            YTStreamExtractor = (YoutubeStreamExtractor) YtService.getStreamExtractor(url);
            log.info("QueryLatestVersion for {}", YTStreamExtractor.getUrl());
            YTStreamExtractor.fetchPage();
            var audioStreams = YTStreamExtractor.getAudioStreams();
            log.info("Responses for {} is {}", videoId, audioStreams);
        } catch (IOException | ExtractionException e) {
            log.error("QueryLatestVersion for {} resulted in an error", videoId, e);
        }
        return "";
    }
}
