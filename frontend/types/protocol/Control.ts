/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { StreamAction, streamActionFromJSON, streamActionToJSON, StreamJoin } from "./Stream";

export const protobufPackage = "zensayyy.fm.proto";

export interface StreamT {
  videoId: string;
  title: string;
  description: string;
  action: StreamAction;
}

export interface ControlMessage {
  id: StreamJoin | undefined;
  stream?: StreamT | undefined;
}

function createBaseStreamT(): StreamT {
  return { videoId: "", title: "", description: "", action: 0 };
}

export const StreamT = {
  encode(message: StreamT, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.videoId !== "") {
      writer.uint32(10).string(message.videoId);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.action !== 0) {
      writer.uint32(32).int32(message.action);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StreamT {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamT();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.videoId = reader.string();
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.action = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StreamT {
    return {
      videoId: isSet(object.videoId) ? String(object.videoId) : "",
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      action: isSet(object.action) ? streamActionFromJSON(object.action) : 0,
    };
  },

  toJSON(message: StreamT): unknown {
    const obj: any = {};
    message.videoId !== undefined && (obj.videoId = message.videoId);
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.action !== undefined && (obj.action = streamActionToJSON(message.action));
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamT>, I>>(base?: I): StreamT {
    return StreamT.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<StreamT>, I>>(object: I): StreamT {
    const message = createBaseStreamT();
    message.videoId = object.videoId ?? "";
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.action = object.action ?? 0;
    return message;
  },
};

function createBaseControlMessage(): ControlMessage {
  return { id: undefined, stream: undefined };
}

export const ControlMessage = {
  encode(message: ControlMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      StreamJoin.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.stream !== undefined) {
      StreamT.encode(message.stream, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ControlMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseControlMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = StreamJoin.decode(reader, reader.uint32());
          break;
        case 2:
          message.stream = StreamT.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ControlMessage {
    return {
      id: isSet(object.id) ? StreamJoin.fromJSON(object.id) : undefined,
      stream: isSet(object.stream) ? StreamT.fromJSON(object.stream) : undefined,
    };
  },

  toJSON(message: ControlMessage): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id ? StreamJoin.toJSON(message.id) : undefined);
    message.stream !== undefined && (obj.stream = message.stream ? StreamT.toJSON(message.stream) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ControlMessage>, I>>(base?: I): ControlMessage {
    return ControlMessage.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ControlMessage>, I>>(object: I): ControlMessage {
    const message = createBaseControlMessage();
    message.id = (object.id !== undefined && object.id !== null) ? StreamJoin.fromPartial(object.id) : undefined;
    message.stream = (object.stream !== undefined && object.stream !== null)
      ? StreamT.fromPartial(object.stream)
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
