import { HttpException, HttpStatus } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, SchemaTypes, Types } from 'mongoose';

export enum Colors {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
  Black = 'black',
  Yellow = 'yellow',
}

@Schema({
  timestamps: true,
  collection: 'gamers',
  statics: {
    async createGamer(gamer: Gamer): Promise<any> {
      try {
        return this.create(gamer);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    },
  },
})
export class Gamer {
  @Prop({ required: true })
  owner: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  uniqueName: string;

  @Prop({ required: true, unique: true })
  telegramCheckCode: string;

  @Prop()
  telegramSubscriptionName: string;

  @Prop()
  telegramId: string;

  @Prop({ enum: Colors })
  color: Colors;
}

export type GamerDocument = HydratedDocument<Gamer>;
export interface GamerModel extends Model<GamerDocument> {
  createGamer(gamer: Gamer): Promise<any>;
}

export const GamerSchema = SchemaFactory.createForClass(Gamer);
