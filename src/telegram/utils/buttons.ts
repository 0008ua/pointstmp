import { Markup } from 'telegraf';
import { BUTTON_TEXT } from '../telegram.constants';

export const mainMenuButtons = Markup.keyboard([
  [BUTTON_TEXT.subscribe, BUTTON_TEXT.viewSubscribtions],
]).resize();

export const backMenuButtton = Markup.keyboard([BUTTON_TEXT.back]).resize();

export const viewSubscriptionsMenuButtons = (
  btns: {
    text: string;
    data: string;
  }[],
) => {
  return Markup.inlineKeyboard(
    btns.map((btn) => [Markup.button.callback(btn.text, btn.data)]),
  );
};
