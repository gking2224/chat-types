import { Record, String } from 'runtypes';

export const CreateRoomBodyValidationType = Record({
  room: String
});

export const validateCreateRoomBody = (body: any) => {
  return CreateRoomBodyValidationType.check(body);
}
