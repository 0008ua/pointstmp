import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorLogger, ErrorLoggerModel } from './entities/error-logger.entity';

@Injectable()
export class LoggerService {
  constructor(@InjectModel(ErrorLogger.name) readonly errorLoggerModel: ErrorLoggerModel) {}
  logErrorToDB(errorLogger: ErrorLogger) {
    return this.errorLoggerModel.createErrorLogger(errorLogger);
  }
}
