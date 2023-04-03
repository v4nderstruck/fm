/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../google/protobuf/timestamp";
import { Track } from "./Track";

export const protobufPackage = "zensayyy.fm.proto";

export interface ServerTrackData {
  tracks: Track[];
}

export enum ServerTrackData_Operation {
  ADD = 0,
  NEW = 1,
  UNRECOGNIZED = -1,
}

export function serverTrackData_OperationFromJSON(object: any): ServerTrackData_Operation {
  switch (object) {
    case 0:
    case "ADD":
      return ServerTrackData_Operation.ADD;
    case 1:
    case "NEW":
      return ServerTrackData_Operation.NEW;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ServerTrackData_Operation.UNRECOGNIZED;
  }
}

export function serverTrackData_OperationToJSON(object: ServerTrackData_Operation): string {
  switch (object) {
    case ServerTrackData_Operation.ADD:
      return "ADD";
    case ServerTrackData_Operation.NEW:
      return "NEW";
    case ServerTrackData_Operation.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface MixerControlData {
  track: Track | undefined;
}

export enum MixerControlData_Operation {
  ADD = 0,
  UPDATE = 1,
  REMOVE = 2,
  UNRECOGNIZED = -1,
}

export function mixerControlData_OperationFromJSON(object: any): MixerControlData_Operation {
  switch (object) {
    case 0:
    case "ADD":
      return MixerControlData_Operation.ADD;
    case 1:
    case "UPDATE":
      return MixerControlData_Operation.UPDATE;
    case 2:
    case "REMOVE":
      return MixerControlData_Operation.REMOVE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MixerControlData_Operation.UNRECOGNIZED;
  }
}

export function mixerControlData_OperationToJSON(object: MixerControlData_Operation): string {
  switch (object) {
    case MixerControlData_Operation.ADD:
      return "ADD";
    case MixerControlData_Operation.UPDATE:
      return "UPDATE";
    case MixerControlData_Operation.REMOVE:
      return "REMOVE";
    case MixerControlData_Operation.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface MixerReqData {
  sliceStart: number;
  sliceEnd: number;
}

export interface MixerProtocol {
  type: MixerProtocol_Type;
  steamId: string;
  token: string;
  time: Date | undefined;
  serverTrackPayload?: ServerTrackData | undefined;
  mixerReqData?: MixerReqData | undefined;
  mixerControlData?: MixerControlData | undefined;
}

export enum MixerProtocol_Type {
  MIXER_CONTROL_DATA = 0,
  MIXER_REQ_DATA = 1,
  SERVER_TRACK_DATA = 2,
  UNRECOGNIZED = -1,
}

export function mixerProtocol_TypeFromJSON(object: any): MixerProtocol_Type {
  switch (object) {
    case 0:
    case "MIXER_CONTROL_DATA":
      return MixerProtocol_Type.MIXER_CONTROL_DATA;
    case 1:
    case "MIXER_REQ_DATA":
      return MixerProtocol_Type.MIXER_REQ_DATA;
    case 2:
    case "SERVER_TRACK_DATA":
      return MixerProtocol_Type.SERVER_TRACK_DATA;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MixerProtocol_Type.UNRECOGNIZED;
  }
}

export function mixerProtocol_TypeToJSON(object: MixerProtocol_Type): string {
  switch (object) {
    case MixerProtocol_Type.MIXER_CONTROL_DATA:
      return "MIXER_CONTROL_DATA";
    case MixerProtocol_Type.MIXER_REQ_DATA:
      return "MIXER_REQ_DATA";
    case MixerProtocol_Type.SERVER_TRACK_DATA:
      return "SERVER_TRACK_DATA";
    case MixerProtocol_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseServerTrackData(): ServerTrackData {
  return { tracks: [] };
}

export const ServerTrackData = {
  encode(message: ServerTrackData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.tracks) {
      Track.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ServerTrackData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServerTrackData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tracks.push(Track.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ServerTrackData {
    return { tracks: Array.isArray(object?.tracks) ? object.tracks.map((e: any) => Track.fromJSON(e)) : [] };
  },

  toJSON(message: ServerTrackData): unknown {
    const obj: any = {};
    if (message.tracks) {
      obj.tracks = message.tracks.map((e) => e ? Track.toJSON(e) : undefined);
    } else {
      obj.tracks = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ServerTrackData>, I>>(base?: I): ServerTrackData {
    return ServerTrackData.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ServerTrackData>, I>>(object: I): ServerTrackData {
    const message = createBaseServerTrackData();
    message.tracks = object.tracks?.map((e) => Track.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMixerControlData(): MixerControlData {
  return { track: undefined };
}

export const MixerControlData = {
  encode(message: MixerControlData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.track !== undefined) {
      Track.encode(message.track, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MixerControlData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMixerControlData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.track = Track.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MixerControlData {
    return { track: isSet(object.track) ? Track.fromJSON(object.track) : undefined };
  },

  toJSON(message: MixerControlData): unknown {
    const obj: any = {};
    message.track !== undefined && (obj.track = message.track ? Track.toJSON(message.track) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<MixerControlData>, I>>(base?: I): MixerControlData {
    return MixerControlData.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MixerControlData>, I>>(object: I): MixerControlData {
    const message = createBaseMixerControlData();
    message.track = (object.track !== undefined && object.track !== null) ? Track.fromPartial(object.track) : undefined;
    return message;
  },
};

function createBaseMixerReqData(): MixerReqData {
  return { sliceStart: 0, sliceEnd: 0 };
}

export const MixerReqData = {
  encode(message: MixerReqData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sliceStart !== 0) {
      writer.uint32(8).int32(message.sliceStart);
    }
    if (message.sliceEnd !== 0) {
      writer.uint32(16).int32(message.sliceEnd);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MixerReqData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMixerReqData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sliceStart = reader.int32();
          break;
        case 2:
          message.sliceEnd = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MixerReqData {
    return {
      sliceStart: isSet(object.sliceStart) ? Number(object.sliceStart) : 0,
      sliceEnd: isSet(object.sliceEnd) ? Number(object.sliceEnd) : 0,
    };
  },

  toJSON(message: MixerReqData): unknown {
    const obj: any = {};
    message.sliceStart !== undefined && (obj.sliceStart = Math.round(message.sliceStart));
    message.sliceEnd !== undefined && (obj.sliceEnd = Math.round(message.sliceEnd));
    return obj;
  },

  create<I extends Exact<DeepPartial<MixerReqData>, I>>(base?: I): MixerReqData {
    return MixerReqData.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MixerReqData>, I>>(object: I): MixerReqData {
    const message = createBaseMixerReqData();
    message.sliceStart = object.sliceStart ?? 0;
    message.sliceEnd = object.sliceEnd ?? 0;
    return message;
  },
};

function createBaseMixerProtocol(): MixerProtocol {
  return {
    type: 0,
    steamId: "",
    token: "",
    time: undefined,
    serverTrackPayload: undefined,
    mixerReqData: undefined,
    mixerControlData: undefined,
  };
}

export const MixerProtocol = {
  encode(message: MixerProtocol, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.steamId !== "") {
      writer.uint32(18).string(message.steamId);
    }
    if (message.token !== "") {
      writer.uint32(26).string(message.token);
    }
    if (message.time !== undefined) {
      Timestamp.encode(toTimestamp(message.time), writer.uint32(34).fork()).ldelim();
    }
    if (message.serverTrackPayload !== undefined) {
      ServerTrackData.encode(message.serverTrackPayload, writer.uint32(42).fork()).ldelim();
    }
    if (message.mixerReqData !== undefined) {
      MixerReqData.encode(message.mixerReqData, writer.uint32(50).fork()).ldelim();
    }
    if (message.mixerControlData !== undefined) {
      MixerControlData.encode(message.mixerControlData, writer.uint32(58).fork()).ldelim();
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
          message.type = reader.int32() as any;
          break;
        case 2:
          message.steamId = reader.string();
          break;
        case 3:
          message.token = reader.string();
          break;
        case 4:
          message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 5:
          message.serverTrackPayload = ServerTrackData.decode(reader, reader.uint32());
          break;
        case 6:
          message.mixerReqData = MixerReqData.decode(reader, reader.uint32());
          break;
        case 7:
          message.mixerControlData = MixerControlData.decode(reader, reader.uint32());
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
      type: isSet(object.type) ? mixerProtocol_TypeFromJSON(object.type) : 0,
      steamId: isSet(object.steamId) ? String(object.steamId) : "",
      token: isSet(object.token) ? String(object.token) : "",
      time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
      serverTrackPayload: isSet(object.serverTrackPayload)
        ? ServerTrackData.fromJSON(object.serverTrackPayload)
        : undefined,
      mixerReqData: isSet(object.mixerReqData) ? MixerReqData.fromJSON(object.mixerReqData) : undefined,
      mixerControlData: isSet(object.mixerControlData) ? MixerControlData.fromJSON(object.mixerControlData) : undefined,
    };
  },

  toJSON(message: MixerProtocol): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = mixerProtocol_TypeToJSON(message.type));
    message.steamId !== undefined && (obj.steamId = message.steamId);
    message.token !== undefined && (obj.token = message.token);
    message.time !== undefined && (obj.time = message.time.toISOString());
    message.serverTrackPayload !== undefined && (obj.serverTrackPayload = message.serverTrackPayload
      ? ServerTrackData.toJSON(message.serverTrackPayload)
      : undefined);
    message.mixerReqData !== undefined &&
      (obj.mixerReqData = message.mixerReqData ? MixerReqData.toJSON(message.mixerReqData) : undefined);
    message.mixerControlData !== undefined &&
      (obj.mixerControlData = message.mixerControlData ? MixerControlData.toJSON(message.mixerControlData) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<MixerProtocol>, I>>(base?: I): MixerProtocol {
    return MixerProtocol.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MixerProtocol>, I>>(object: I): MixerProtocol {
    const message = createBaseMixerProtocol();
    message.type = object.type ?? 0;
    message.steamId = object.steamId ?? "";
    message.token = object.token ?? "";
    message.time = object.time ?? undefined;
    message.serverTrackPayload = (object.serverTrackPayload !== undefined && object.serverTrackPayload !== null)
      ? ServerTrackData.fromPartial(object.serverTrackPayload)
      : undefined;
    message.mixerReqData = (object.mixerReqData !== undefined && object.mixerReqData !== null)
      ? MixerReqData.fromPartial(object.mixerReqData)
      : undefined;
    message.mixerControlData = (object.mixerControlData !== undefined && object.mixerControlData !== null)
      ? MixerControlData.fromPartial(object.mixerControlData)
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
