package zensayyy.fm.yt.api;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;
import zensayyy.fm.yt.api.types.LatestVersionsType;

@Component
@Slf4j
public class QueryLatestVersion implements ApiIfc<String> {

    @Autowired
    private WebClient webClient;

    private JSONObject ctx;
    private int itag = 140;
    public static final String END_POINT = "/youtubei/v1/player";

    public QueryLatestVersion() {
        ctx = new JSONObject();
        setContext();
    }

    public void setVideoId(String videoId) {
        ctx.put("videoId", videoId);
    }

    public void setItag(int itag) {
        this.itag = itag;
    }

    @Cacheable
    private void setContext() {
        JSONObject client = new JSONObject();
        client.put("hl", "en");
        client.put("gl", "US");
        client.put("clientName", "WEB");
        client.put("clientVersion", "2.20221118.01.00");
        JSONObject context = new JSONObject();
        context.put("client", client);
        ctx.put("contentCheckOk", false);
        ctx.put("racyCheckOk", false);
        ctx.put("context", context);
    }

    // return the latest version given a video id
    @Override
    public String query() {
        Mono<LatestVersionsType> result = webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path(END_POINT)
                        .queryParam("key", "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8")
                        .queryParam("prettyPrint", "false")
                        .build())
                .accept(MediaType.ALL)
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(ctx.toString()))
                .retrieve()
                .bodyToMono(LatestVersionsType.class);

        if (result.block() != null) {
            String url = result.block().findStreamByItag(itag);
            log.info("QueryLatesVersion found Url: {}", url);
            return url;
        }  
        return "";
    }
}
