package zensayyy.fm.yt;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.schabi.newpipe.extractor.downloader.Downloader;
import org.schabi.newpipe.extractor.downloader.Request;
import org.schabi.newpipe.extractor.downloader.Response;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

@Slf4j
public final class NewPipeDownloader extends Downloader {

  private static NewPipeDownloader instance;
  private WebClient webClient;

  public static NewPipeDownloader getInstance() {
    if (instance == null) {
      instance = new NewPipeDownloader();
    }
    return instance;
  }

  public NewPipeDownloader() {
    log.info("NewPipeDownloader initialized");
    int memSize = 16 * 1024 * 1024;
    var exchangeStrat =
        ExchangeStrategies.builder()
            .codecs(codecs -> codecs.defaultCodecs().maxInMemorySize(memSize))
            .build();
    webClient =
        WebClient.builder()
            .defaultHeader(
                "User-Agent",
                "Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0")
            .exchangeStrategies(exchangeStrat)
            .clientConnector(new ReactorClientHttpConnector(
                HttpClient.create().followRedirect(true)))
            .build();
  }

  @Override
  public Response execute(Request request) {
    HttpMethod method = HttpMethod.valueOf(request.httpMethod());
    String url = request.url();
    byte[] dataToSend = request.dataToSend();

    var responseWrapper = new Object() {
      int responseCode;
      String responseMessage;
      Map<String, List<String>> responseHeaders;
      String latestUrl;
    };

    var reqBody = dataToSend == null ? BodyInserters.empty()
                                     : BodyInserters.fromValue(dataToSend);

    log.info("NewPipeDownloader executing {} {}", method, url);
    String body = "";
    try {
      body = webClient.method(method)
                 .uri(url)
                 .body(reqBody)
                 .exchangeToMono((response) -> {
                   responseWrapper.responseCode = response.statusCode().value();
                   responseWrapper.responseMessage =
                       HttpStatus.valueOf(response.statusCode().value())
                           .getReasonPhrase();
                   responseWrapper.latestUrl =
                       url; // client should follow redirects

                   var responseHeaderMap =
                       response.headers().asHttpHeaders().toSingleValueMap();
                   responseWrapper.responseHeaders =
                       responseHeaderMap.entrySet().stream().collect(
                           Collectors.toMap(Map.Entry::getKey,
                                            e -> List.of(e.getValue())));

                   try {
                     var some = response.bodyToMono(String.class);
                     return some;
                   } catch (Exception e) {
                     log.error("Error", e);
                   }
                   return response.bodyToMono(String.class);
                 })
                 .block();
    } catch (Exception e) {
      log.error("Error", e);
    }

    return new Response(
        responseWrapper.responseCode, responseWrapper.responseMessage,
        responseWrapper.responseHeaders, body, responseWrapper.latestUrl);
  }
}
