import {
  Update,
  Ctx,
  Start,
  Help,
  On,
  Hears,
  Command,
  InjectBot,
  Action,
  SceneLeave,
} from 'nestjs-telegraf';
import { Telegraf, Markup } from 'telegraf';
import { callback } from 'telegraf/typings/button';
import { button } from 'telegraf/typings/markup';
import {
  BIND_USER,
  BUTTON_TEXT,
  TELEGRAM_BOT_NAME,
  VIEW_SUBSCRIBTIONS,
} from './telegram.constants';
import { SceneContext } from './telegram.interface';
import { backCmd, startCmd } from './utils/commands';

@Update()
export class TelegramUpdate {
  @Start()
  async start(@Ctx() ctx: SceneContext) {
    // console.log(ctx.from.id);
    await startCmd(ctx);
    // await ctx.reply(
    //   'Welcome',
    //   mainMenu,
    // Markup.inlineKeyboard([[Markup.button.callback('Додати користувача', 'addUser')]]),
    // Markup.keyboard([['Додати користувача']]).resize(),
    // {
    // {
    //   reply_markup: {
    //     keyboard: [['Додати користувача']],
    //   },
    // },
    // reply_markup: {
    //   inline_keyboard: [[{ text: 'Додати користувача', callback_data: 'addUser' }]],
    // },
    // });
    // );
  }
  @Hears(BUTTON_TEXT.back)
  async hearsBack(@Ctx() ctx: any) {
    await backCmd(ctx);
  }

  @Hears(BUTTON_TEXT.subscribe)
  async hearsSubscribe(@Ctx() ctx: any) {
    await ctx.scene.enter(BIND_USER);
  }

  @Hears(BUTTON_TEXT.viewSubscribtions)
  async hearsVievSubscribtions(@Ctx() ctx: any) {
    await ctx.scene.enter(VIEW_SUBSCRIBTIONS);
  }

  // @Hears(BUTTON_TEXT.back)
  // async hearsBack(@Ctx() ctx: any) {
  //   await ctx.reply('You are in menu', { ...mainMenu });
  // }

  // @Hears('Додати користувача')
  // async hearsAddUser(@Ctx() ctx: any) {
  //   await ctx.scene.enter(BIND_USER);
  // }

  // @Action('addUser')
  // async onAddUser(@Ctx() ctx: any) {
  //   await ctx.scene.enter(BIND_USER);
  // }

  // @Command('scene')
  // async onSceneCommand(@Ctx() ctx: SceneContext): Promise<void> {
  //   await ctx.scene.enter(BIND_USER);
  // }

  // @On('message')
  // async onMessage(@Ctx() ctx: any) {
  //   console.log('message');
  //   // await ctx.reply('ok', {
  //   //   reply_markup: {
  //   //     inline_keyboard: [[{ text: 'Ok', callback_data: ctx.message }]],
  //   //   },
  //   // });
  //   // await ctx.reply('👍');
  // }

  // @Help()
  // async help(@Ctx() ctx: any) {
  //   await ctx.reply('Send me a sticker');
  // }

  // @Hears('hi')
  // async hears(@Ctx() ctx: any) {
  //   await ctx.reply('Hey there');
  // }
}
