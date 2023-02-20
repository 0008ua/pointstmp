import { Module } from '@nestjs/common';
import { GamerService } from './gamer.service';
import { GamerController } from './gamer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Gamer, GamerSchema } from './entities/gamer.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gamer.name, schema: GamerSchema }]),
    CommonModule,
  ],
  controllers: [GamerController],
  providers: [GamerService],
  exports: [GamerService],
})
export class GamerModule {}
