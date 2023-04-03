/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../google/protobuf/timestamp";

export const protobufPackage = "zensayyy.fm.proto";

export interface Track {
  trackEvents: TrackTimeEvent[];
  tracks: TrackMetadata[];
  time: Date | undefined;
  id: string;
}

export interface TrackTimeEvent {
  event: TrackTimeEvent_Event;
  time: number;
  duration: number;
  refTrackId: number;
}

export enum TrackTimeEvent_Event {
  FADE_OUT = 0,
  DUCK = 1,
  UNRECOGNIZED = -1,
}

export function trackTimeEvent_EventFromJSON(object: any): TrackTimeEvent_Event {
  switch (object) {
    case 0:
    case "FADE_OUT":
      return TrackTimeEvent_Event.FADE_OUT;
    case 1:
    case "DUCK":
      return TrackTimeEvent_Event.DUCK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TrackTimeEvent_Event.UNRECOGNIZED;
  }
}

export function trackTimeEvent_EventToJSON(object: TrackTimeEvent_Event): string {
  switch (object) {
    case TrackTimeEvent_Event.FADE_OUT:
      return "FADE_OUT";
    case TrackTimeEvent_Event.DUCK:
      return "DUCK";
    case TrackTimeEvent_Event.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface TrackMetadata {
  trackId: string;
  title: string;
  artist: string;
  thumbnail: string;
  source: string;
  length: number;
  extension: string;
}

function createBaseTrack(): Track {
  return { trackEvents: [], tracks: [], time: undefined, id: "" };
}

export const Track = {
  encode(message: Track, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.trackEvents) {
      TrackTimeEvent.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.tracks) {
      TrackMetadata.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(26).fork()).ldelim();
    }
    if (message.id !== "") {
      writer.uint32(34).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Track {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrack();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.trackEvents.push(TrackTimeEvent.decode(reader, reader.uint32()));
          break;
        case 2:
          message.tracks.push(TrackMetadata.decode(reader, reader.uint32()));
          break;
        case 3:
          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Track {
    return {
      trackEvents: Array.isArray(object?.trackEvents)
        ? object.trackEvents.map((e: any) => TrackTimeEvent.fromJSON(e))
        : [],
      tracks: Array.isArray(object?.tracks) ? object.tracks.map((e: any) => TrackMetadata.fromJSON(e)) : [],
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: Track): unknown {
    const obj: any = {};
    if (message.trackEvents) {
      obj.trackEvents = message.trackEvents.map((e) => e ? TrackTimeEvent.toJSON(e) : undefined);
    } else {
      obj.trackEvents = [];
    }
    if (message.tracks) {
      obj.tracks = message.tracks.map((e) => e ? TrackMetadata.toJSON(e) : undefined);
    } else {
      obj.tracks = [];
    }
    message.time !== undefined && (obj.time = message.time.toISOString());
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create<I extends Exact<DeepPartial<Track>, I>>(base?: I): Track {
    return Track.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Track>, I>>(object: I): Track {
    const message = createBaseTrack();
    message.trackEvents = object.trackEvents?.map((e) => TrackTimeEvent.fromPartial(e)) || [];
    message.tracks = object.tracks?.map((e) => TrackMetadata.fromPartial(e)) || [];
    message.time = object.time ?? undefined;
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseTrackTimeEvent(): TrackTimeEvent {
  return { event: 0, time: 0, duration: 0, refTrackId: 0 };
}

export const TrackTimeEvent = {
  encode(message: TrackTimeEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.event !== 0) {
      writer.uint32(8).int32(message.event);
    }
    if (message.time !== 0) {
      writer.uint32(16).int32(message.time);
    }
    if (message.duration !== 0) {
      writer.uint32(24).int32(message.duration);
    }
    if (message.refTrackId !== 0) {
      writer.uint32(32).int32(message.refTrackId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TrackTimeEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrackTimeEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.event = reader.int32() as any;
          break;
        case 2:
          message.time = reader.int32();
          break;
        case 3:
          message.duration = reader.int32();
          break;
        case 4:
          message.refTrackId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TrackTimeEvent {
    return {
      event: isSet(object.event) ? trackTimeEvent_EventFromJSON(object.event) : 0,
      time: isSet(object.time) ? Number(object.time) : 0,
      duration: isSet(object.duration) ? Number(object.duration) : 0,
      refTrackId: isSet(object.refTrackId) ? Number(object.refTrackId) : 0,
    };
  },

  toJSON(message: TrackTimeEvent): unknown {
    const obj: any = {};
    message.event !== undefined && (obj.event = trackTimeEvent_EventToJSON(message.event));
    message.time !== undefined && (obj.time = Math.round(message.time));
    message.duration !== undefined && (obj.duration = Math.round(message.duration));
    message.refTrackId !== undefined && (obj.refTrackId = Math.round(message.refTrackId));
    return obj;
  },

  create<I extends Exact<DeepPartial<TrackTimeEvent>, I>>(base?: I): TrackTimeEvent {
    return TrackTimeEvent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TrackTimeEvent>, I>>(object: I): TrackTimeEvent {
    const message = createBaseTrackTimeEvent();
    message.event = object.event ?? 0;
    message.time = object.time ?? 0;
    message.duration = object.duration ?? 0;
    message.refTrackId = object.refTrackId ?? 0;
    return message;
  },
};

function createBaseTrackMetadata(): TrackMetadata {
  return { trackId: "", title: "", artist: "", thumbnail: "", source: "", length: 0, extension: "" };
}

export const TrackMetadata = {
  encode(message: TrackMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.trackId !== "") {
      writer.uint32(10).string(message.trackId);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.artist !== "") {
      writer.uint32(26).string(message.artist);
    }
    if (message.thumbnail !== "") {
      writer.uint32(34).string(message.thumbnail);
    }
    if (message.source !== "") {
      writer.uint32(42).string(message.source);
    }
    if (message.length !== 0) {
      writer.uint32(48).int64(message.length);
    }
    if (message.extension !== "") {
      writer.uint32(58).string(message.extension);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TrackMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrackMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.trackId = reader.string();
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.artist = reader.string();
          break;
        case 4:
          message.thumbnail = reader.string();
          break;
        case 5:
          message.source = reader.string();
          break;
        case 6:
          message.length = longToNumber(reader.int64() as Long);
          break;
        case 7:
          message.extension = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TrackMetadata {
    return {
      trackId: isSet(object.trackId) ? String(object.trackId) : "",
      title: isSet(object.title) ? String(object.title) : "",
      artist: isSet(object.artist) ? String(object.artist) : "",
      thumbnail: isSet(object.thumbnail) ? String(object.thumbnail) : "",
      source: isSet(object.source) ? String(object.source) : "",
      length: isSet(object.length) ? Number(object.length) : 0,
      extension: isSet(object.extension) ? String(object.extension) : "",
    };
  },

  toJSON(message: TrackMetadata): unknown {
    const obj: any = {};
    message.trackId !== undefined && (obj.trackId = message.trackId);
    message.title !== undefined && (obj.title = message.title);
    message.artist !== undefined && (obj.artist = message.artist);
    message.thumbnail !== undefined && (obj.thumbnail = message.thumbnail);
    message.source !== undefined && (obj.source = message.source);
    message.length !== undefined && (obj.length = Math.round(message.length));
    message.extension !== undefined && (obj.extension = message.extension);
    return obj;
  },

  create<I extends Exact<DeepPartial<TrackMetadata>, I>>(base?: I): TrackMetadata {
    return TrackMetadata.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TrackMetadata>, I>>(object: I): TrackMetadata {
    const message = createBaseTrackMetadata();
    message.trackId = object.trackId ?? "";
    message.title = object.title ?? "";
    message.artist = object.artist ?? "";
    message.thumbnail = object.thumbnail ?? "";
    message.source = object.source ?? "";
    message.length = object.length ?? 0;
    message.extension = object.extension ?? "";
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
