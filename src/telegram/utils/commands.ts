import { backMenuButtton, mainMenuButtons } from './buttons';

export const startCmd = async (ctx) =>
  await ctx.reply('Welcome', { ...mainMenuButtons });

export const backCmd = async (ctx) =>
  await ctx.reply('You get back to the main menu', { ...mainMenuButtons });

export const onSubscribeSceneCmd = async (ctx) =>
  await ctx.reply('Enter code', { ...backMenuButtton });

export const onViewSubscribtionsCmd = async (ctx) =>
  await ctx.reply('View subscribtions', { ...backMenuButtton });
