import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { compare } from 'bcryptjs';
import { HydratedDocument, Model } from 'mongoose';
import { NAME_EXIST, USER_NOT_FOUND, WRONG_PASSWORD } from '../../common/error.constants';
import { UserDataDto } from '../dto/userData.dto';

export enum UserRoles {
  Member = 'member',
  Guest = 'guest',
}

@Schema({
  timestamps: true,
  collection: 'users',
  statics: {
    isNameUnique(name: string): Promise<true> {
      return new Promise((resolve, reject) => {
        this.findOne<UserDocument>({ name })
          .then((userFromDb) => {
            if (userFromDb) {
              return reject(new HttpException(...NAME_EXIST));
            }
            return resolve(true);
          })
          .catch((err) => reject(err));
      });
    },
    isNameExist(name: string): Promise<UserDocument> {
      return new Promise((resolve, reject) => {
        this.findOne<UserDocument>({ name })
          .then((userFromDb) => {
            if (userFromDb) {
              return resolve(userFromDb);
            }
            return reject(new HttpException(...USER_NOT_FOUND));
          })
          .catch((err) => reject(err));
      });
    },
    isPasswordMatched(candidatePassword: string, userFromDb: UserDocument): Promise<UserDocument> {
      return new Promise((resolve, reject) => {
        compare(candidatePassword, userFromDb.password)
          .then((passwordMatched) => {
            if (passwordMatched) {
              return resolve(userFromDb);

              // return resolve({
              //   name: userFromDb.name,
              //   role: userFromDb.role,
              //   _id: userFromDb._id.toString(),
              // });
            } else {
              return reject(new HttpException(...WRONG_PASSWORD));
            }
          })
          .catch((err) => reject(err));
      });
    },
    findUserByIdAndUpdateTimestamp(_id: string): Promise<UserDocument> {
      return new Promise((resolve, reject) => {
        if (!_id) {
          return reject(new HttpException(...USER_NOT_FOUND));
        }
        // empty update object, reason: update timestamp after using $set operator
        this.findOneAndUpdate<UserDocument>(
          { _id },
          { $set: {} },
          {
            upsert: false,
            useFindAndModify: false,
            new: true,
            rawResult: false,
          },
        )
          .then((userFromDb) => {
            if (userFromDb) {
              return resolve(userFromDb);
              // return resolve({
              //   name: userFromDb.name,
              //   role: userFromDb.role,
              //   _id: userFromDb._id.toString(),
              // });
            }
            return reject(new HttpException(...USER_NOT_FOUND));
          })
          .catch((error) => reject(new HttpException(error.message, HttpStatus.BAD_REQUEST)));
      });
    },

    async createUser(user: User): Promise<UserDocument> {
      let userFromDb: any;
      try {
        userFromDb = await this.create(user);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      return userFromDb;
    },
  },
})
export class User {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserRoles, default: UserRoles.Guest })
  role: UserRoles;
}

export type UserDocument = HydratedDocument<User>;
export interface UserModel extends Model<UserDocument> {
  findUserByIdAndUpdateTimestamp(_id: string): Promise<UserDocument>;
  isNameUnique(name: string): Promise<true>;
  isNameExist(name: string): Promise<UserDocument>;
  isPasswordMatched(candidatePassword: string, userFromDb: UserDocument): Promise<UserDocument>;
  createUser(user: User): Promise<UserDocument>;
}

export const UserSchema = SchemaFactory.createForClass(User);
