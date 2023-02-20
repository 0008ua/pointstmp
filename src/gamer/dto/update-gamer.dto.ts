import { PartialType } from '@nestjs/mapped-types';
import { Gamer } from '../entities/gamer.entity';

export class UpdateGamerDto extends PartialType(Gamer) {}
