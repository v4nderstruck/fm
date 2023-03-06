import util from 'util';
import WebSocket from 'ws';
import { StreamJoin, StreamMessage, StreamAction } from './proto/protocol/Stream';

const ws = new WebSocket('ws://localhost:8001/live');
ws.binaryType = "arraybuffer";


ws.on("open", () => {
    const join: StreamMessage = StreamMessage.create({
        action: StreamAction.FRESH,
        join: StreamJoin.create({ streamId: "yt_stream" })
    });
    const encoded = StreamMessage.encode(join).finish();
    console.log("Sending join request: ", join);
    ws.send(encoded);
});

ws.on("message", (data: ArrayBuffer) => {
    const message = StreamMessage.decode(new Uint8Array(data));
    if (message.join)
        console.log("Join message: ", util.inspect(message, false, null, true));
    else if (message.update)
        console.log("Update message: ", util.inspect(message, false, null, true));
    else if (message.updateSummary)
        console.log("Summary message: ", util.inspect(message, false, null, true));
});