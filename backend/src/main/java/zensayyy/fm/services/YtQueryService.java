package zensayyy.fm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import zensayyy.fm.yt.YTPlayer;

@RestController
public class YtQueryService {

  @Autowired private YTPlayer ytPlayer;

  @GetMapping(value = "/yt/q/{id}", produces = "application/octet-stream")
  public ResponseEntity<byte[]> queryMetaById(@PathVariable String id) {
    ytPlayer.queryLatestVersion.setVideoId(id);
    var result = ytPlayer.queryLatestVersion.query();
    return new ResponseEntity<byte[]>(result.toByteArray(),
                                      HttpStatusCode.valueOf(200));
  }
}
