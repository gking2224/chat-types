declare module 'chat-types' {

  // message
  export type Author = string;
  export type LanguageCode = string;
  export type MessageText = string;
  export type MessageId = string;

  // room
  export type RoomName = string;

  // connection
  export type ConnectionId = string;

  export type NewChatMessage = {
    message: MessageText;
    author: Author;
    room: RoomName;
    translation?: MessageText;
    language?: LanguageCode;
  }


  export interface GetMessagesResponse {
    readonly messages: NewChatMessage[];
  }


  export interface PendingMessage {
    readonly room: RoomName;
    readonly message: MessageText;
    readonly author: Author;
  }

  export interface SavedMessage extends PendingMessage {
    readonly language: LanguageCode;
    readonly messageId: MessageId;
    readonly translation?: MessageText;
  }


  export interface DoInitialize {
    readonly action: 'init';
    readonly room: RoomName;
  }
  export interface PostNewMessage {
    readonly action: 'message';
    readonly message: PendingMessage;
  }
  export type IncomingSocketMessage = DoInitialize | PostNewMessage;

  export interface InitializeResponse {
    readonly action: 'init';
    readonly messages: SavedMessage[];
  }

  export interface PublishMessage {
    readonly action: 'message';
    readonly message: SavedMessage;
  }

  export type OutgoingSocketMessage = InitializeResponse | PublishMessage;

  export interface SavedConnection {
    readonly room: RoomName;
    readonly connectionId: ConnectionId;
    readonly author: Author;
  }

  export interface CreateRoomBody {
    room: string;
  }

  export type GetRoomsResponse = {
    rooms: RoomName[];
  }

  export function validateCreateRoomBody(body: any): CreateRoomBody;

  export interface GetMessagesResponse {
    readonly messages: NewChatMessage[];
  }

  export interface SavedChatMessage extends NewChatMessage {
    messageId: string;
  }

  export type InitMessage = {
    action: 'init';
    room: string;
  }
  export type InitRoomMessages = {
    action: 'init';
    messages: SavedChatMessage[];
  }
  export type SendNewMessage = {
    action: 'message';
    message: NewChatMessage;
  }
  export type ReceiveNewMessage = {
    action: 'message';
    message: SavedChatMessage;
  }
  export type SendMessage = InitMessage | SendNewMessage;
  export type ReceiveMessage = ReceiveNewMessage | InitRoomMessages;

}
