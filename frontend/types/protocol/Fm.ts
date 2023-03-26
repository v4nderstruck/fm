/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../google/protobuf/timestamp";
import { Track } from "./Track";

export const protobufPackage = "zensayyy.fm.proto";

/**
 * / Control Messages received by the Client
 * / Todo: Control Messages for Synchronize Streams
 */
export interface FmControl {
  control: FmControl_Control;
  tracks: Track[];
}

export enum FmControl_Control {
  /** SYNC_REQ - client request DATA */
  SYNC_REQ = 0,
  DATA = 1,
  UNRECOGNIZED = -1,
}

export function fmControl_ControlFromJSON(object: any): FmControl_Control {
  switch (object) {
    case 0:
    case "SYNC_REQ":
      return FmControl_Control.SYNC_REQ;
    case 1:
    case "DATA":
      return FmControl_Control.DATA;
    case -1:
    case "UNRECOGNIZED":
    default:
      return FmControl_Control.UNRECOGNIZED;
  }
}

export function fmControl_ControlToJSON(object: FmControl_Control): string {
  switch (object) {
    case FmControl_Control.SYNC_REQ:
      return "SYNC_REQ";
    case FmControl_Control.DATA:
      return "DATA";
    case FmControl_Control.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** / Join Message send by the clients */
export interface FmJoin {
  streamId: string;
}

/** / FmProtocol Message */
export interface FmProtocol {
  time: Date | undefined;
  join?: FmJoin | undefined;
  control?: FmControl | undefined;
}

function createBaseFmControl(): FmControl {
  return { control: 0, tracks: [] };
}

export const FmControl = {
  encode(message: FmControl, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.control !== 0) {
      writer.uint32(8).int32(message.control);
    }
    for (const v of message.tracks) {
      Track.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FmControl {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFmControl();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.control = reader.int32() as any;
          break;
        case 2:
          message.tracks.push(Track.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FmControl {
    return {
      control: isSet(object.control) ? fmControl_ControlFromJSON(object.control) : 0,
      tracks: Array.isArray(object?.tracks) ? object.tracks.map((e: any) => Track.fromJSON(e)) : [],
    };
  },

  toJSON(message: FmControl): unknown {
    const obj: any = {};
    message.control !== undefined && (obj.control = fmControl_ControlToJSON(message.control));
    if (message.tracks) {
      obj.tracks = message.tracks.map((e) => e ? Track.toJSON(e) : undefined);
    } else {
      obj.tracks = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FmControl>, I>>(base?: I): FmControl {
    return FmControl.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<FmControl>, I>>(object: I): FmControl {
    const message = createBaseFmControl();
    message.control = object.control ?? 0;
    message.tracks = object.tracks?.map((e) => Track.fromPartial(e)) || [];
    return message;
  },
};

function createBaseFmJoin(): FmJoin {
  return { streamId: "" };
}

export const FmJoin = {
  encode(message: FmJoin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.streamId !== "") {
      writer.uint32(10).string(message.streamId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FmJoin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFmJoin();
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

  fromJSON(object: any): FmJoin {
    return { streamId: isSet(object.streamId) ? String(object.streamId) : "" };
  },

  toJSON(message: FmJoin): unknown {
    const obj: any = {};
    message.streamId !== undefined && (obj.streamId = message.streamId);
    return obj;
  },

  create<I extends Exact<DeepPartial<FmJoin>, I>>(base?: I): FmJoin {
    return FmJoin.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<FmJoin>, I>>(object: I): FmJoin {
    const message = createBaseFmJoin();
    message.streamId = object.streamId ?? "";
    return message;
  },
};

function createBaseFmProtocol(): FmProtocol {
  return { time: undefined, join: undefined, control: undefined };
}

export const FmProtocol = {
  encode(message: FmProtocol, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(10).fork()).ldelim();
    }
    if (message.join !== undefined) {
      FmJoin.encode(message.join, writer.uint32(18).fork()).ldelim();
    }
    if (message.control !== undefined) {
      FmControl.encode(message.control, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FmProtocol {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFmProtocol();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 2:
          message.join = FmJoin.decode(reader, reader.uint32());
          break;
        case 3:
          message.control = FmControl.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FmProtocol {
    return {
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      join: isSet(object.join) ? FmJoin.fromJSON(object.join) : undefined,
      control: isSet(object.control) ? FmControl.fromJSON(object.control) : undefined,
    };
  },

  toJSON(message: FmProtocol): unknown {
    const obj: any = {};
    message.time !== undefined && (obj.time = message.time.toISOString());
    message.join !== undefined && (obj.join = message.join ? FmJoin.toJSON(message.join) : undefined);
    message.control !== undefined && (obj.control = message.control ? FmControl.toJSON(message.control) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<FmProtocol>, I>>(base?: I): FmProtocol {
    return FmProtocol.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<FmProtocol>, I>>(object: I): FmProtocol {
    const message = createBaseFmProtocol();
    message.time = object.time ?? undefined;
    message.join = (object.join !== undefined && object.join !== null) ? FmJoin.fromPartial(object.join) : undefined;
    message.control = (object.control !== undefined && object.control !== null)
      ? FmControl.fromPartial(object.control)
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
