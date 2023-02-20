import { Controller, UseGuards } from '@nestjs/common';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body, Req } from '@nestjs/common/decorators/http/route-params.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateErrorLoggerDto } from './dto/createErrorLogger.dto';
import { ErrorLogger } from './entities/error-logger.entity';
import { LoggerService } from './logger.service';

@Controller('logger')
export class LoggerController {
  constructor(readonly loggerService: LoggerService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('log-error-to-db')
  logErrorToDB(@Req() { user }: Request, @Body() dto: CreateErrorLoggerDto) {
    const errorLogger: ErrorLogger = { ...dto, owner: user._id };
    return this.loggerService.logErrorToDB(errorLogger);
  }
}
