import { Scene, SceneEnter, Ctx, On, Hears } from 'nestjs-telegraf';
import { BIND_USER, BUTTON_TEXT } from '../telegram.constants';
import { SceneContext } from '../telegram.interface';
import { TelegramService } from '../telegram.service';
import { backCmd, onSubscribeSceneCmd } from '../utils/commands';

@Scene(BIND_USER)
export class BindUserScene {
  constructor(protected telegramService: TelegramService) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    onSubscribeSceneCmd(ctx);
  }

  @Hears(BUTTON_TEXT.back)
  async hearsReturn(@Ctx() ctx: any) {
    await ctx.scene.leave();
    backCmd(ctx);
  }

  @On('text')
  async onText(@Ctx() ctx: any) {
    try {
      await this.telegramService.subscribeToBot({
        telegramId: ctx.from.id,
        telegramSubscriptionName: ctx.from.first_name,
        telegramCheckCode: ctx.message.text,
      });
      await ctx.reply('You have successfully subscribed');
    } catch (error) {
      await ctx.reply('Subscription error: ' + error.message);
      throw error;
    }
    await ctx.scene.leave();
    backCmd(ctx);
  }
}
