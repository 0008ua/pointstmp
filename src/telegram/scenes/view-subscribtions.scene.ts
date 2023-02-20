import { Scene, SceneEnter, Ctx, On, Hears } from 'nestjs-telegraf';
import { BUTTON_TEXT, VIEW_SUBSCRIBTIONS } from '../telegram.constants';
import { SceneContext } from '../telegram.interface';
import { TelegramService } from '../telegram.service';
import { backCmd, onViewSubscribtionsCmd } from '../utils/commands';

import { viewSubscriptionsMenuButtons } from '../utils/buttons';

@Scene(VIEW_SUBSCRIBTIONS)
export class ViewSubscribtionsScene {
  constructor(protected telegramService: TelegramService) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: SceneContext) {
    onViewSubscribtionsCmd(ctx);
    const telegramId = String(ctx.from.id);
    const subscribtions = await this.telegramService.getSubscribtions(
      telegramId,
    );
    if (!subscribtions.length) {
      ctx.reply("You haven't subscribtions yet");
      this.hearsReturn(ctx);
    } else {
      const buttons = subscribtions.map((sub) => ({
        text: `Unsubscribe '${sub.name}' (user: ${sub.ownerName})`,
        data: sub._id,
      }));
      ctx.reply('Subscriptions: ', viewSubscriptionsMenuButtons(buttons));
    }
  }

  @Hears(BUTTON_TEXT.back)
  async hearsReturn(@Ctx() ctx: any) {
    await ctx.scene.leave();
    backCmd(ctx);
  }

  @On('callback_query')
  async onAction(@Ctx() ctx: any) {
    const gamerId = ctx.callbackQuery.data;
    try {
      await this.telegramService.unsubscribeFromBot(gamerId);
      await ctx.reply('You have successfully unsubscribed');
      await ctx.answerCbQuery();
    } catch (error) {
      await ctx.reply('Unsubscribe error: ' + error.message);
      await ctx.answerCbQuery();
      throw error;
    }
    this.hearsReturn(ctx);
  }
}
