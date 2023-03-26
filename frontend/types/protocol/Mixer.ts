/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../google/protobuf/timestamp";
import { Track } from "./Track";

export const protobufPackage = "zensayyy.fm.proto";

export interface MixerControl {
  steamId: string;
  token: string;
  control: MixerControl_Control;
  tracks: Track[];
}

export enum MixerControl_Control {
  DATA = 0,
  UNRECOGNIZED = -1,
}

export function mixerControl_ControlFromJSON(object: any): MixerControl_Control {
  switch (object) {
    case 0:
    case "DATA":
      return MixerControl_Control.DATA;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MixerControl_Control.UNRECOGNIZED;
  }
}

export function mixerControl_ControlToJSON(object: MixerControl_Control): string {
  switch (object) {
    case MixerControl_Control.DATA:
      return "DATA";
    case MixerControl_Control.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface MixerProtocol {
  time: Date | undefined;
  control?: MixerControl | undefined;
}

function createBaseMixerControl(): MixerControl {
  return { steamId: "", token: "", control: 0, tracks: [] };
}

export const MixerControl = {
  encode(message: MixerControl, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.steamId !== "") {
      writer.uint32(10).string(message.steamId);
    }
    if (message.token !== "") {
      writer.uint32(18).string(message.token);
    }
    if (message.control !== 0) {
      writer.uint32(24).int32(message.control);
    }
    for (const v of message.tracks) {
      Track.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MixerControl {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMixerControl();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.steamId = reader.string();
          break;
        case 2:
          message.token = reader.string();
          break;
        case 3:
          message.control = reader.int32() as any;
          break;
        case 4:
          message.tracks.push(Track.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MixerControl {
    return {
      steamId: isSet(object.steamId) ? String(object.steamId) : "",
      token: isSet(object.token) ? String(object.token) : "",
      control: isSet(object.control) ? mixerControl_ControlFromJSON(object.control) : 0,
      tracks: Array.isArray(object?.tracks) ? object.tracks.map((e: any) => Track.fromJSON(e)) : [],
    };
  },

  toJSON(message: MixerControl): unknown {
    const obj: any = {};
    message.steamId !== undefined && (obj.steamId = message.steamId);
    message.token !== undefined && (obj.token = message.token);
    message.control !== undefined && (obj.control = mixerControl_ControlToJSON(message.control));
    if (message.tracks) {
      obj.tracks = message.tracks.map((e) => e ? Track.toJSON(e) : undefined);
    } else {
      obj.tracks = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MixerControl>, I>>(base?: I): MixerControl {
    return MixerControl.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MixerControl>, I>>(object: I): MixerControl {
    const message = createBaseMixerControl();
    message.steamId = object.steamId ?? "";
    message.token = object.token ?? "";
    message.control = object.control ?? 0;
    message.tracks = object.tracks?.map((e) => Track.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMixerProtocol(): MixerProtocol {
  return { time: undefined, control: undefined };
}

export const MixerProtocol = {
  encode(message: MixerProtocol, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(10).fork()).ldelim();
    }
    if (message.control !== undefined) {
      MixerControl.encode(message.control, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MixerProtocol {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMixerProtocol();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 2:
          message.control = MixerControl.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MixerProtocol {
    return {
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      control: isSet(object.control) ? MixerControl.fromJSON(object.control) : undefined,
    };
  },

  toJSON(message: MixerProtocol): unknown {
    const obj: any = {};
    message.time !== undefined && (obj.time = message.time.toISOString());
    message.control !== undefined && (obj.control = message.control ? MixerControl.toJSON(message.control) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<MixerProtocol>, I>>(base?: I): MixerProtocol {
    return MixerProtocol.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MixerProtocol>, I>>(object: I): MixerProtocol {
    const message = createBaseMixerProtocol();
    message.time = object.time ?? undefined;
    message.control = (object.control !== undefined && object.control !== null)
      ? MixerControl.fromPartial(object.control)
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
