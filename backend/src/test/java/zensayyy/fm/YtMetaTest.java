package zensayyy.fm;

import io.netty.handler.codec.http.HttpHeaderNames;
import io.netty.handler.codec.http.HttpHeaderValues;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import zensayyy.fm.proto.TrackOuterClass.TrackMetadata;
import zensayyy.fm.services.YtQueryService;

@SpringBootTest
@AutoConfigureMockMvc
public class YtMetaTest {
  @Autowired private MockMvc mvc;

  @Test
  public void test_query_metadata() throws Exception {
    var result = mvc.perform(MockMvcRequestBuilders.get("/api/yt/q/DCkJ5lGPqFs"))
                     .andExpect(MockMvcResultMatchers.status().isOk())
                     .andExpect(MockMvcResultMatchers.header().string(
                         HttpHeaderNames.CONTENT_TYPE.toString(),
                         HttpHeaderValues.APPLICATION_OCTET_STREAM.toString()))
                     .andReturn();
    TrackMetadata meta = TrackMetadata.parseFrom(result.getResponse().getContentAsByteArray());
    assertNotNull(meta);
    assertEquals("DCkJ5lGPqFs", meta.getTrackId());
    assertNotEquals(meta.getThumbnail(), "");
    assertNotEquals(meta.getSource(), "");
  }
}
