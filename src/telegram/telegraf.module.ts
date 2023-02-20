// import { DynamicModule, Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TelegrafModule } from 'nestjs-telegraf';
// import { getTelegramConfig } from 'src/common/config/telegram.config';
// import { sessionMiddleware } from './middlewares/session.middleware';
// import { TELEGRAM_BOT_NAME } from './telegram.constants';
// import { TelegrafFactory } from './telegram.interface';

// @Module({})
// export class TelegrafDynamicModule {
//   static forRootAsync(): DynamicModule {
//     const useFactory = this.extendFactory(getTelegramConfig);
//     return {
//       module: TelegrafDynamicModule,
//       // providers: [...options.providers],
//       // exports: [...options.exports],
//       // controllers: [...options.controllers],
//       imports: [
//         // ...options.imports,
//         TelegrafModule.forRootAsync({
//           botName: TELEGRAM_BOT_NAME,
//           useFactory,
//           inject: [ConfigService],
//           imports: [ConfigModule],
//         }),
//       ],
//     };
//   }

//   private static useFactory(factory: TelegrafFactory) {
//     return (...args: any[]) => ({
//       ...factory(...args),
//       include: [],
//       middlewares: [sessionMiddleware],
//     });
//   }
// }
