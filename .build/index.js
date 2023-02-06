"use strict";
var import_telegraf = require("telegraf");
const botToken = process.env.TELEGRAM_BOT_TOKEN;
if (botToken === void 0) {
  console.error("missing telegram bot token");
  process.exit();
}
const bot = new import_telegraf.Telegraf(botToken);
const ownerTelegramID = Number(process.env.OWNER_TELEGRAM_ID);
bot.command("whoami", (ctx) => {
  ctx.reply("I am a telegram bot that is used by @irfansppp to become his personal assistant by using OpenAI");
});
bot.on("message", async (ctx) => {
  var _a;
  if (ctx.from.id != ownerTelegramID) {
    ctx.reply("Sorry, I'm not allowed to answer your question because you're not my boss");
    return;
  }
  if (!ctx.message) {
    ctx.reply("Sorry boss, I don't get any message.");
    return;
  }
  const text = (_a = ctx.message) == null ? void 0 : _a.text;
  ctx.reply(text);
});
bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
//# sourceMappingURL=index.js.map
