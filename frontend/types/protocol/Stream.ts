/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../google/protobuf/timestamp";

export const protobufPackage = "zensayyy.fm.proto";

export enum StreamAction {
  ADD = 0,
  FRESH = 1,
  UNRECOGNIZED = -1,
}

export function streamActionFromJSON(object: any): StreamAction {
  switch (object) {
    case 0:
    case "ADD":
      return StreamAction.ADD;
    case 1:
    case "FRESH":
      return StreamAction.FRESH;
    case -1:
    case "UNRECOGNIZED":
    default:
      return StreamAction.UNRECOGNIZED;
  }
}

export function streamActionToJSON(object: StreamAction): string {
  switch (object) {
    case StreamAction.ADD:
      return "ADD";
    case StreamAction.FRESH:
      return "FRESH";
    case StreamAction.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ClipMetadata {
  src: string;
  title: string;
  description: string;
  thumbnail: string;
}

export interface StreamUpdate {
  /** next upcoming clip, first one is the active one */
  upcoming:
    | ClipMetadata
    | undefined;
  /** timestamp from server (???) */
  time: Date | undefined;
}

export interface StreamUpdateSummary {
  updates: StreamUpdate[];
}

/** sent by the browser / app to the server to join a stream (receive updates) */
export interface StreamJoin {
  streamId: string;
}

export interface StreamMessage {
  action: StreamAction;
  updateSummary?: StreamUpdateSummary | undefined;
  update?: StreamUpdate | undefined;
  join?: StreamJoin | undefined;
}

function createBaseClipMetadata(): ClipMetadata {
  return { src: "", title: "", description: "", thumbnail: "" };
}

export const ClipMetadata = {
  encode(message: ClipMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.src !== "") {
      writer.uint32(10).string(message.src);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.thumbnail !== "") {
      writer.uint32(34).string(message.thumbnail);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClipMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClipMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.src = reader.string();
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.thumbnail = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClipMetadata {
    return {
      src: isSet(object.src) ? String(object.src) : "",
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      thumbnail: isSet(object.thumbnail) ? String(object.thumbnail) : "",
    };
  },

  toJSON(message: ClipMetadata): unknown {
    const obj: any = {};
    message.src !== undefined && (obj.src = message.src);
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.thumbnail !== undefined && (obj.thumbnail = message.thumbnail);
    return obj;
  },

  create<I extends Exact<DeepPartial<ClipMetadata>, I>>(base?: I): ClipMetadata {
    return ClipMetadata.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ClipMetadata>, I>>(object: I): ClipMetadata {
    const message = createBaseClipMetadata();
    message.src = object.src ?? "";
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.thumbnail = object.thumbnail ?? "";
    return message;
  },
};

function createBaseStreamUpdate(): StreamUpdate {
  return { upcoming: undefined, time: undefined };
}

export const StreamUpdate = {
  encode(message: StreamUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.upcoming !== undefined) {
      ClipMetadata.encode(message.upcoming, writer.uint32(18).fork()).ldelim();
    }
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamUpdate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.upcoming = ClipMetadata.decode(reader, reader.uint32());
          break;
        case 3:
          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamUpdate {
    return {
      upcoming: isSet(object.upcoming) ? ClipMetadata.fromJSON(object.upcoming) : undefined,
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
    };
  },

  toJSON(message: StreamUpdate): unknown {
    const obj: any = {};
    message.upcoming !== undefined &&
      (obj.upcoming = message.upcoming ? ClipMetadata.toJSON(message.upcoming) : undefined);
    message.time !== undefined && (obj.time = message.time.toISOString());
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamUpdate>, I>>(base?: I): StreamUpdate {
    return StreamUpdate.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamUpdate>, I>>(object: I): StreamUpdate {
    const message = createBaseStreamUpdate();
    message.upcoming = (object.upcoming !== undefined && object.upcoming !== null)
      ? ClipMetadata.fromPartial(object.upcoming)
      : undefined;
    message.time = object.time ?? undefined;
    return message;
  },
};

function createBaseStreamUpdateSummary(): StreamUpdateSummary {
  return { updates: [] };
}

export const StreamUpdateSummary = {
  encode(message: StreamUpdateSummary, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.updates) {
      StreamUpdate.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamUpdateSummary {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamUpdateSummary();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.updates.push(StreamUpdate.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamUpdateSummary {
    return { updates: Array.isArray(object?.updates) ? object.updates.map((e: any) => StreamUpdate.fromJSON(e)) : [] };
  },

  toJSON(message: StreamUpdateSummary): unknown {
    const obj: any = {};
    if (message.updates) {
      obj.updates = message.updates.map((e) => e ? StreamUpdate.toJSON(e) : undefined);
    } else {
      obj.updates = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamUpdateSummary>, I>>(base?: I): StreamUpdateSummary {
    return StreamUpdateSummary.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamUpdateSummary>, I>>(object: I): StreamUpdateSummary {
    const message = createBaseStreamUpdateSummary();
    message.updates = object.updates?.map((e) => StreamUpdate.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStreamJoin(): StreamJoin {
  return { streamId: "" };
}

export const StreamJoin = {
  encode(message: StreamJoin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.streamId !== "") {
      writer.uint32(10).string(message.streamId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamJoin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamJoin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.streamId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamJoin {
    return { streamId: isSet(object.streamId) ? String(object.streamId) : "" };
  },

  toJSON(message: StreamJoin): unknown {
    const obj: any = {};
    message.streamId !== undefined && (obj.streamId = message.streamId);
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamJoin>, I>>(base?: I): StreamJoin {
    return StreamJoin.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamJoin>, I>>(object: I): StreamJoin {
    const message = createBaseStreamJoin();
    message.streamId = object.streamId ?? "";
    return message;
  },
};

function createBaseStreamMessage(): StreamMessage {
  return { action: 0, updateSummary: undefined, update: undefined, join: undefined };
}

export const StreamMessage = {
  encode(message: StreamMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.action !== 0) {
      writer.uint32(8).int32(message.action);
    }
    if (message.updateSummary !== undefined) {
      StreamUpdateSummary.encode(message.updateSummary, writer.uint32(18).fork()).ldelim();
    }
    if (message.update !== undefined) {
      StreamUpdate.encode(message.update, writer.uint32(26).fork()).ldelim();
    }
    if (message.join !== undefined) {
      StreamJoin.encode(message.join, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.action = reader.int32() as any;
          break;
        case 2:
          message.updateSummary = StreamUpdateSummary.decode(reader, reader.uint32());
          break;
        case 3:
          message.update = StreamUpdate.decode(reader, reader.uint32());
          break;
        case 4:
          message.join = StreamJoin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamMessage {
    return {
      action: isSet(object.action) ? streamActionFromJSON(object.action) : 0,
      updateSummary: isSet(object.updateSummary) ? StreamUpdateSummary.fromJSON(object.updateSummary) : undefined,
      update: isSet(object.update) ? StreamUpdate.fromJSON(object.update) : undefined,
      join: isSet(object.join) ? StreamJoin.fromJSON(object.join) : undefined,
    };
  },

  toJSON(message: StreamMessage): unknown {
    const obj: any = {};
    message.action !== undefined && (obj.action = streamActionToJSON(message.action));
    message.updateSummary !== undefined &&
      (obj.updateSummary = message.updateSummary ? StreamUpdateSummary.toJSON(message.updateSummary) : undefined);
    message.update !== undefined && (obj.update = message.update ? StreamUpdate.toJSON(message.update) : undefined);
    message.join !== undefined && (obj.join = message.join ? StreamJoin.toJSON(message.join) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamMessage>, I>>(base?: I): StreamMessage {
    return StreamMessage.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamMessage>, I>>(object: I): StreamMessage {
    const message = createBaseStreamMessage();
    message.action = object.action ?? 0;
    message.updateSummary = (object.updateSummary !== undefined && object.updateSummary !== null)
      ? StreamUpdateSummary.fromPartial(object.updateSummary)
      : undefined;
    message.update = (object.update !== undefined && object.update !== null)
      ? StreamUpdate.fromPartial(object.update)
      : undefined;
    message.join = (object.join !== undefined && object.join !== null)
      ? StreamJoin.fromPartial(object.join)
      : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
