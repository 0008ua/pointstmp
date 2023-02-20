import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorLogger, ErrorLoggerSchema } from './entities/error-logger.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: ErrorLogger.name, schema: ErrorLoggerSchema }])],
  providers: [LoggerService],
  controllers: [LoggerController],
})
export class LoggerModule {}
