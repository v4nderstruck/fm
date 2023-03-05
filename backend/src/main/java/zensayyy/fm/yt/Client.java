package zensayyy.fm.yt;

import java.net.http.HttpHeaders;
import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

@Configuration
@Slf4j
public class Client {

    // funny thing is: if you use https://youtube.com, it will not work
    // also, copilot literally suggested this comment but after I fixed it
    public static final String YT_URL = "https://www.youtube.com";

    @Bean
    public WebClient webClient() {
        MultiValueMap<String, String> defaultCookiesMap = new LinkedMultiValueMap<String, String>();
        WebClient webClient = WebClient.builder()
                .baseUrl(YT_URL)
                .clientConnector(new ReactorClientHttpConnector(HttpClient.create().followRedirect(true)))
                .build();
 
        webClient.get().uri("/").exchangeToMono((response) -> {
            if(!response.statusCode().equals(HttpStatus.OK)) {
                log.error("Error while getting cookies from youtube.com {}", response.statusCode());           
                throw new ResponseStatusException(response.statusCode());
            }
            log.info("Cookies repspose {}", response.cookies());
            for(String keys: response.cookies().keySet()) {
                defaultCookiesMap.put(keys, Arrays.asList(response.cookies().get(keys).get(0).getValue()));
            }
            return Mono.empty(); 
        }).block();

        log.info("Cookies {}", defaultCookiesMap);

        WebClient web = WebClient.builder()
                .baseUrl(YT_URL)
                .defaultCookies(cookies -> cookies.addAll(defaultCookiesMap))
                .build();
        return web;
    }
}
