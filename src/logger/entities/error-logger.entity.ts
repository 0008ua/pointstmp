import { HttpException, HttpStatus } from '@nestjs/common';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'games',
  statics: {
    async createErrorLogger(errorLogger: ErrorLogger): Promise<any> {
      try {
        return this.create(errorLogger);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    },
  },
})
export class ErrorLogger {
  @Prop({ required: true, default: 'Unknown Error' })
  message: string;

  @Prop({ required: true })
  owner: string;
}

export type ErrorLoggerDocument = HydratedDocument<ErrorLogger>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ErrorLoggerModel extends Model<ErrorLoggerDocument> {
  createErrorLogger(errorLogger: ErrorLogger): Promise<any>;
}

export const ErrorLoggerSchema = SchemaFactory.createForClass(ErrorLogger);
