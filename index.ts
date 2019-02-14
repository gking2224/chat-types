import { Array, Record, String, Union, Literal, Static, Null, Undefined } from 'runtypes';

// -- ConnectionId -- //
const _ConnectionId = String;
export type ConnectionId = Static<typeof _ConnectionId>;
export const validateConnectionId = (c: any) => _ConnectionId.check(c);
// -- END ConnectionId -- //


// -- ConnectionEntity -- //
const _ConnectionEntity = Record({
  room: String,
  author: String,
  connectionId: _ConnectionId,
})
export type ConnectionEntity = Static<typeof _ConnectionEntity>;
export const validateConnectionEntity = (c: any) => _ConnectionEntity.check(c);
// -- END ConnectionEntity -- //

// -- RoomEntity -- //
const _RoomEntity = Record({
  room: String
})
export type RoomEntity = Static<typeof _RoomEntity>;
export const validateRoomEntity = (r: any) => _RoomEntity.check(r);
// -- END RoomEntity -- //

// -- BaseChatRoomMessage -- //
const _BaseChatRoomMessage = Record({
  message: String,
  room: String,
  author: String
});
export type BaseChatRoomMessage = Static<typeof _BaseChatRoomMessage>;
// -- END BaseChatRoomMessage -- //

// -- ChatRoomMessageEntity -- //
const _ChatRoomMessageEntity = _BaseChatRoomMessage.And(Record({
  messageId: String,
  translation: String.Or(Null).Or(Undefined),
  language: String
}))
export type ChatRoomMessageEntity = Static<typeof _ChatRoomMessageEntity>;
export const validateChatRoomMessageEntity = (m: any) => _ChatRoomMessageEntity.check(m);
// -- END ChatRoomMessageEntity -- //

// -- WebsocketMessageResponse -- //
const _NotifyNewMessage = Record({
  action: Literal('message'),
  message: _ChatRoomMessageEntity
});
export type NotifyNewMessage = Static<typeof _NotifyNewMessage>;
const _InitRoomResponse = Record({
  action: Literal('init'),
  messages: Array(_ChatRoomMessageEntity)
})
export type InitRoomResponse = Static<typeof _InitRoomResponse>;
const _WebsocketMessageResponse = Union(
  _InitRoomResponse,
  _NotifyNewMessage
)
export type WebsocketMessageResponse = Static<typeof _WebsocketMessageResponse>;
// -- END WebsocketMessageResponse -- //

// -- WebsocketMessageRequest -- //
const _IncomingNewMessage = _BaseChatRoomMessage;

export type IncomingNewMessage = Static<typeof _IncomingNewMessage>;
const _RequestInitRoom = Record({
  action: Literal('init'),
  roomName: String,
});
export type RequestInitRoom = Static<typeof _RequestInitRoom>
const _PublishNewMessage = Record({
  action: Literal('message'),
  message: _IncomingNewMessage
});
export type PublishNewMessage = Static<typeof _PublishNewMessage>;
const _WebsocketMessageRequest = Union(
  _PublishNewMessage,
  _RequestInitRoom
)
export type WebsocketMessageRequest = Static<typeof _WebsocketMessageRequest>;
export const validateWebsocketMessageRequestBody = (body: any) => {
  return _WebsocketMessageRequest.check(JSON.parse(body));
}
// -- END WebsocketMessageRequest -- //

// -- CreateRoomBody -- //
const _CreateRoomBody = Record({
  roomName: String
});
export type CreateRoomBody = Static<typeof _CreateRoomBody>;
export const validateCreateRoomBody = (body: any) => _CreateRoomBody.check(JSON.parse(body));
// -- END CreateRoomBody -- //

// -- CreateRoomResponse -- //
const _CreateRoomResponse = Record({
  roomName: String
});
export type CreateRoomResponse = Static<typeof _CreateRoomBody>;
export const validateCreateRoomResponse = (body: any) => _CreateRoomResponse.check(body);
// -- END CreateRoomBody -- //

// -- WebsocketEventType -- //
const _WebsocketEventType = Union(
  Literal('CONNECT'),
  Literal('DISCONNECT'),
  Literal('MESSAGE')
);
export type WebsocketEventType = Static<typeof _WebsocketEventType>;
export const validateWebsocketEventType = (eventType: any) => _WebsocketEventType.check(eventType);
// -- END WebsocketEventType -- //

// -- WebsocketConnectQueryParameters -- //
const _WebsocketConnectQueryParameters = Record({
  room: String,
  author: String
});
export type WebsocketConnectQueryParameters = Static<typeof _WebsocketConnectQueryParameters>;
export const validateWebsocketConnectQueryParameters = (qsp: any) => _WebsocketConnectQueryParameters.check(qsp);
// -- END WebsocketConnectQueryParameters -- //

// -- GetRoomsResponse -- //
const _GetRoomsResponse = Record({
  rooms: Array(String)
})
export type GetRoomsResponse = Static<typeof _GetRoomsResponse>;
export const validateGetRoomsResponse = (b: any) => _GetRoomsResponse.check(b);
// -- END GetRoomsResponse -- //
