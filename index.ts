import { Telegraf } from 'telegraf';
// import { MyOpenAI } from './openai';

const botToken: string | undefined = process.env.TELEGRAM_BOT_TOKEN;
if (botToken === undefined) {
  console.error('missing telegram bot token');
  process.exit();
}

const bot = new Telegraf(botToken);

// const ownerTelegramID: number = Number(process.env.OWNER_TELEGRAM_ID);

bot.command('whoami', ctx => {
  ctx.reply(`I am a telegram bot that is used by @irfansppp to become his personal assistant. I'm powered by OpenAI.`);
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'))

process.once('SIGTERM', () => bot.stop('SIGTERM'))