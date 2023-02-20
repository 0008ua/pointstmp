import { PartialType } from '@nestjs/mapped-types';
import { Game } from '../entities/game.entity';

export class UpdateGameDto extends PartialType(Game) {}
