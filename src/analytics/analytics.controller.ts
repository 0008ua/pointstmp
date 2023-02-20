import { Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AnalyticsService } from './analytics.service';
import { GameType } from '../app.interfaces';

@Controller('analytics')
export class AnalyticsController {
  constructor(readonly analyticsService: AnalyticsService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get('get-wins/:gameType')
  getWins(@Req() req: Request, @Param('gameType') gameType: GameType) {
    return this.analyticsService.getWins({ userId: req.user._id, gameType });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-wins-to-games/:gameType')
  getWinsToGames(@Req() req: Request, @Param('gameType') gameType: GameType) {
    return this.analyticsService.getWinsToGames({ userId: req.user._id, gameType });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-rating/:gameType')
  async getRating(@Req() req: Request, @Param('gameType') gameType: GameType) {
    const rating = await this.analyticsService.getRating({ userId: req.user._id, gameType });
    return rating;
  }
}
