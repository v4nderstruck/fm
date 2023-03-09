package zensayyy.fm.yt;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Nonnull;

import org.schabi.newpipe.extractor.downloader.Downloader;
import org.schabi.newpipe.extractor.downloader.Request;
import org.schabi.newpipe.extractor.downloader.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

public class NewPipeDownloader extends Downloader{
   
   @Autowired
   private WebClient webClient;
   

   @Override 
   public Response execute(@Nonnull Request request) {
      HttpMethod method = HttpMethod.valueOf(request.httpMethod()); 
      String url = request.url();
      byte[] dataToSend = request.dataToSend();

      var responseWrapper = new Object() {
         int responseCode;
         String responseMessage;
         Map<String, List<String>> responseHeaders;
         String latestUrl;
      };

      String body =  webClient.method(method)
         .uri(url)
         .body(BodyInserters.fromValue(dataToSend))
         .exchangeToMono((response) -> {
            responseWrapper.responseCode = response.statusCode().value();
            responseWrapper.responseMessage = HttpStatus.valueOf(response.statusCode().value()).getReasonPhrase();
            responseWrapper.latestUrl = url; // client should follow redirects

            var responseHeaderMap = response.headers().asHttpHeaders().toSingleValueMap();
            responseWrapper.responseHeaders = responseHeaderMap.entrySet().stream()
               .collect(Collectors.toMap(Map.Entry::getKey, e -> List.of(e.getValue())));
            
            return response.bodyToMono(String.class);
         }).block();
      return new Response(
         responseWrapper.responseCode, 
         responseWrapper.responseMessage, 
         responseWrapper.responseHeaders, 
         body,
         responseWrapper.latestUrl);
   }
}
