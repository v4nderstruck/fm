package zensayyy.fm.broker;

import java.io.IOException;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.WebSocketSession;

import lombok.extern.slf4j.Slf4j;
import zensayyy.fm.proto.Stream.StreamAction;
import zensayyy.fm.proto.Stream.StreamJoin;
import zensayyy.fm.proto.Stream.StreamMessage;
import zensayyy.fm.proto.Stream.StreamUpdate;
import zensayyy.fm.proto.Stream.StreamUpdateSummary;;

@Component
@Slf4j
public class MessagesBroker {
    private Map<StreamJoin, LinkedList<StreamUpdate>> streamUpdates;
    private Map<StreamJoin, HashSet<WebSocketSession>> streamSessions;


    public MessagesBroker() {
        streamUpdates = new ConcurrentHashMap<StreamJoin, LinkedList<StreamUpdate>>();
        streamSessions = new ConcurrentHashMap<StreamJoin, HashSet<WebSocketSession>>();
    }

    public void addSession(StreamJoin streamJoin, WebSocketSession session) {
        if (!streamUpdates.containsKey(streamJoin) || !streamSessions.containsKey(streamJoin)) {
            log.error("Stream {} does not exist", streamJoin.getStreamId());
            return;
        }
        HashSet<WebSocketSession> sessions = streamSessions.get(streamJoin);
        if (sessions == null) {
            sessions = new HashSet<WebSocketSession>();
            streamSessions.put(streamJoin, sessions);
        }
        sessions.add(session);
        log.info("Added session {} to stream {}", session.getId(), streamJoin.getStreamId());

        LinkedList<StreamUpdate> updates = streamUpdates.get(streamJoin);
        if (updates != null) {
            StreamUpdateSummary.Builder summary = StreamUpdateSummary.newBuilder();
            for (StreamUpdate update : updates) {
                summary.addUpdates(update);
            }
            StreamUpdateSummary updateSummary = summary.build();
            try {
                session.sendMessage(    
                    new BinaryMessage(
                        StreamMessage.newBuilder()
                            .setAction(StreamAction.FRESH)
                            .setUpdateSummary(updateSummary)
                            .build()
                            .toByteArray()
                    ));
            } catch (IOException e) {
                log.error("Broker failed to send messages to {}: {}", session.getId(), e);
            }
        }
    }

    public void addStream(StreamJoin streamJoin) {
        streamUpdates.put(streamJoin, new LinkedList<StreamUpdate>());
        streamSessions.put(streamJoin, new HashSet<WebSocketSession>());
        log.info("Added stream {} ", streamJoin.getStreamId());
    }

    public void removeStream(StreamJoin streamJoin) {
        // maybe notify clients?
        streamSessions.remove(streamJoin);
        streamUpdates.remove(streamJoin);
        log.info("Removed stream {} ", streamJoin.getStreamId());
    }

    public void removeSession(WebSocketSession session) {
        for (HashSet<WebSocketSession> sessions : streamSessions.values()) {
            sessions.remove(session);
        }
        log.info("Removed session {} ", session.getId());
    }

    public void addStreamUpdate(StreamJoin streamJoin, StreamUpdate streamUpdate) {
        LinkedList<StreamUpdate> updates = streamUpdates.get(streamJoin);
        if (updates == null) {
            updates = new LinkedList<StreamUpdate>();
            streamUpdates.put(streamJoin, updates);
        }
        updates.add(streamUpdate);
        log.info("Added {} to stream {}", streamUpdate, streamJoin.getStreamId());

        HashSet<WebSocketSession> sessions = streamSessions.get(streamJoin);
        if (sessions != null) {
            for (WebSocketSession session : sessions) {
                try {
                    session.sendMessage(    
                        new BinaryMessage(
                            StreamMessage.newBuilder()
                                .setAction(StreamAction.ADD)
                                .setUpdate(streamUpdate)
                                .build()
                                .toByteArray()
                        ));
                } catch (IOException e) {
                    log.error("Broker failed to send messages to {}: {}", session.getId(), e);
                }
            }
        }

    }

    public void popStreamElement(StreamJoin streamJoin) {
        LinkedList<StreamUpdate> updates = streamUpdates.get(streamJoin);
        if (updates != null) {
            StreamUpdate f = updates.removeFirst();
            log.info("Removed {} from stream {}", f, streamJoin.getStreamId());
        }
    }
}
