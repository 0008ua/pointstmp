import { UserDataDto } from '../src/auth/dto/userData.dto';

declare global {
  declare namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends UserDataDto {}
  }
}
