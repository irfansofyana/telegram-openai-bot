"use strict";
var import_telegraf = require("telegraf");
var import_wizard = require("./wizard");
const botToken = process.env.TELEGRAM_BOT_TOKEN;
if (botToken === void 0) {
  console.error("missing telegram bot token");
  process.exit();
}
const bot = new import_telegraf.Telegraf(botToken);
const ownerTelegramID = Number(process.env.OWNER_TELEGRAM_ID);
const stage = new import_telegraf.Scenes.Stage([
  import_wizard.tldrWizard,
  import_wizard.amaWizard,
  import_wizard.writeCodeWizard,
  import_wizard.explainCodeWizard,
  import_wizard.brainstormWizard
]);
bot.use(async (ctx, next) => {
  var _a;
  if (((_a = ctx.from) == null ? void 0 : _a.id) != ownerTelegramID) {
    ctx.reply(`You're not my boss, I can't answer your question!`);
    return;
  }
  await next();
});
bot.use((0, import_telegraf.session)());
bot.use(stage.middleware());
bot.command("tldr", (ctx) => ctx.scene.enter("tldr"));
bot.command("ama", (ctx) => ctx.scene.enter("ama"));
bot.command("code", (ctx) => ctx.scene.enter("writecode"));
bot.command("explaincode", (ctx) => ctx.scene.enter("explaincode"));
bot.command("brainstorm", (ctx) => ctx.scene.enter("brainstorm"));
bot.command("whoami", (ctx) => {
  ctx.reply(`I am a telegram bot that is used by @irfansppp to become his personal assistant. I'm powered by OpenAI.`);
});
bot.on("message", (ctx) => {
  ctx.reply(`Please use commands available in order to ask me, boss.`);
});
bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
//# sourceMappingURL=index.js.map
