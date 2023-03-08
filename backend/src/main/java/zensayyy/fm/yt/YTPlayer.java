package zensayyy.fm.yt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import zensayyy.fm.yt.api.QueryLatestVersion;

@Configuration
public class YTPlayer {
    @Autowired
    public QueryLatestVersion queryLatestVersion;

    @Bean
    public YTPlayer ytPlayer() {
        return new YTPlayer();
    }
}
