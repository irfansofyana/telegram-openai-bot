import { Telegraf, Scenes, session } from 'telegraf';
import { message } from 'telegraf/filters';
import {
  tldr,
  ama,
  writeCode,
  explainCode,
  brainstorm,
  chat,
  image,
  convo
} from './handler';
import { telegramToken, ownerTelegramId } from './config';

const createBot = (telegramToken: string | undefined): Telegraf => {
  if (telegramToken === undefined) {
    console.error('missing telegram bot token');
    process.exit();
  }

  return new Telegraf(telegramToken);
};

const bot = createBot(telegramToken);

const main = async (): Promise<void> => {
  const stage = new Scenes.Stage([
    tldr,
    ama,
    writeCode,
    explainCode,
    brainstorm,
    image,
    convo
  ]);

  bot.use(async (ctx, next) => {
    if (ctx.from?.id !== ownerTelegramId) {
      await ctx.reply("You're not my boss, I can't answer your question!");
      return;
    }

    await next();
  });

  bot.use(session());

  bot.use(stage.middleware());

  bot.command('tldr', (ctx) => ctx.scene.enter('tldr'));

  bot.command('ama', (ctx) => ctx.scene.enter('ama'));

  bot.command('code', (ctx) => ctx.scene.enter('writecode'));

  bot.command('explaincode', (ctx) => ctx.scene.enter('explaincode'));

  bot.command('brainstorm', (ctx) => ctx.scene.enter('brainstorm'));

  bot.command('image', (ctx) => ctx.scene.enter('image'));

  bot.command('startconvo', (ctx) => ctx.scene.enter('convo'));

  bot.command('whoami', async (ctx) => {
    await ctx.reply(
      "I am a telegram bot that is used by @irfansppp to become his personal assistant. I'm powered by OpenAI."
    );
  });

  bot.on(message('sticker'), async (ctx) => await ctx.reply('👍'));

  bot.on(message('text'), async (ctx) => {
    await chat(ctx);
  });

  await bot.launch();
};

main()
  .then()
  .catch((err) => {
    console.error(err);
  });

process.once('SIGINT', () => {
  bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
  bot.stop('SIGTERM');
});
