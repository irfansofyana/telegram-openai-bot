import { Telegraf, Scenes, session } from 'telegraf';
import {
  tldrWizard,
  amaWizard,
  writeCodeWizard,
  explainCodeWizard,
  brainstormWizard
} from './wizard';

const botToken: string | undefined = process.env.TELEGRAM_BOT_TOKEN;
if (botToken === undefined) {
  console.error('missing telegram bot token');
  process.exit();
}

const bot = new Telegraf(botToken);

const ownerTelegramID: number = Number(process.env.OWNER_TELEGRAM_ID);

const stage = new Scenes.Stage([
  tldrWizard, amaWizard, writeCodeWizard, explainCodeWizard, brainstormWizard
]);

bot.use(async (ctx, next) => {
  if (ctx.from?.id != ownerTelegramID) {
    ctx.reply(`You're not my boss, I can't answer your question!`);
    return;
  }

  await next();
})

bot.use(session());

bot.use(stage.middleware());

bot.command('tldr', ctx => ctx.scene.enter('tldr'));

bot.command('ama', ctx => ctx.scene.enter('ama'));

bot.command('code', ctx => ctx.scene.enter('writecode'));

bot.command('explaincode', ctx => ctx.scene.enter('explaincode'));

bot.command('brainstorm', ctx => ctx.scene.enter('brainstorm'));

bot.command('whoami', ctx => {
  ctx.reply(`I am a telegram bot that is used by @irfansppp to become his personal assistant. I'm powered by OpenAI.`);
});

bot.on('message', ctx => {
  ctx.reply(`Please use commands available in order to ask me, boss.`)
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'))

process.once('SIGTERM', () => bot.stop('SIGTERM'))
