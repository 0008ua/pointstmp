import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  Put,
} from '@nestjs/common';
import { GamerService } from './gamer.service';
import { CreateGamerDto } from './dto/create-gamer.dto';
import { UpdateGamerDto } from './dto/update-gamer.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Gamer } from './entities/gamer.entity';
import { HelpersService } from 'src/common/helpers.service';

@Controller(['store/gamer', 'store/gamers'])
export class GamerController {
  constructor(
    private readonly gamerService: GamerService,
    readonly helpersService: HelpersService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateGamerDto, @Req() { user }: Request) {
    const code = this.helpersService.generateTelegramSecurityCode();
    const newGamer: Gamer = {
      ...dto,
      owner: user._id,
      uniqueName: user._id + dto.name,
      telegramCheckCode: code,
      telegramId: '',
      telegramSubscriptionName: '',
    };
    return this.gamerService.create(newGamer);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getWithQuery(@Query() query: any, @Req() { user }: Request) {
    if (Object.keys(query).length === 0) {
      return this.gamerService.getAll(user._id);
    }
    return this.gamerService.getWithQuery(query, user._id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':_id')
  findOne(@Param('_id') _id: string, @Req() { user }: Request) {
    return this.gamerService.findOne(_id, user._id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':_id')
  update(
    @Param('_id') _id: string,
    @Req() { user }: Request,
    @Body() dto: UpdateGamerDto,
  ) {
    return this.gamerService.update(_id, dto, user._id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':_id')
  remove(@Param('_id') _id: string, @Req() { user }: Request) {
    return this.gamerService.remove(_id, user._id);
  }
}
