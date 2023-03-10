"use strict";
var import_telegraf = require("telegraf");
var import_filters = require("telegraf/filters");
var import_handlers = require("./handlers");
const botToken = process.env.TELEGRAM_BOT_TOKEN;
if (botToken === void 0) {
  console.error("missing telegram bot token");
  process.exit();
}
const bot = new import_telegraf.Telegraf(botToken);
const main = async () => {
  const ownerTelegramID = Number(process.env.OWNER_TELEGRAM_ID);
  const stage = new import_telegraf.Scenes.Stage([
    import_handlers.tldr,
    import_handlers.ama,
    import_handlers.writeCode,
    import_handlers.explainCode,
    import_handlers.brainstorm,
    import_handlers.image
  ]);
  bot.use(async (ctx, next) => {
    var _a;
    if (((_a = ctx.from) == null ? void 0 : _a.id) !== ownerTelegramID) {
      await ctx.reply("You're not my boss, I can't answer your question!");
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
  bot.command("image", (ctx) => ctx.scene.enter("image"));
  bot.command("whoami", async (ctx) => {
    await ctx.reply(
      "I am a telegram bot that is used by @irfansppp to become his personal assistant. I'm powered by OpenAI."
    );
  });
  bot.on((0, import_filters.message)("sticker"), async (ctx) => await ctx.reply("\u{1F44D}"));
  bot.on((0, import_filters.message)("text"), async (ctx) => {
    await (0, import_handlers.chat)(ctx);
  });
  await bot.launch();
};
main().then().catch((err) => {
  console.error(err);
});
process.once("SIGINT", () => {
  bot.stop("SIGINT");
});
process.once("SIGTERM", () => {
  bot.stop("SIGTERM");
});
//# sourceMappingURL=index.js.map
