package zensayyy.fm.yt;

import org.schabi.newpipe.extractor.NewPipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.extern.slf4j.Slf4j;
import zensayyy.fm.yt.api.QueryLatestVersion;

@Slf4j
@Configuration
public class YTPlayer {
    
    @Autowired
    public QueryLatestVersion queryLatestVersion;

    static public void init() {
        NewPipe.init(NewPipeDownloader.getInstance());
        log.info("Streaming services {}", NewPipe.getServices());
    }

    @Bean
    public YTPlayer ytPlayer() {
        return new YTPlayer();
    }
}
