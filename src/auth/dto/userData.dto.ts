import { UserDocument } from '../entities/user.entity';

export type UserDataType = Pick<UserDocument, 'name' | 'role'> & {
  _id: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserDataDto extends UserDataType {}
