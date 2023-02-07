"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var wizard_exports = {};
__export(wizard_exports, {
  amaWizard: () => amaWizard,
  brainstormWizard: () => brainstormWizard,
  explainCodeWizard: () => explainCodeWizard,
  tldrWizard: () => tldrWizard,
  writeCodeWizard: () => writeCodeWizard
});
module.exports = __toCommonJS(wizard_exports);
var import_openai = require("./openai");
var import_telegraf = require("telegraf");
var import_filters = require("telegraf/filters");
const myAI = new import_openai.MyOpenAI();
const tldrWizard = new import_telegraf.Scenes.BaseScene("tldr");
tldrWizard.enter((ctx) => ctx.reply("Please give me the text boss"));
tldrWizard.on((0, import_filters.message)("text"), async (ctx) => {
  const textInput = ctx.message.text;
  try {
    ctx.reply("Hang on boss.. this might take a while.");
    const response = await myAI.tldr(textInput);
    ctx.reply(response);
    return ctx.scene.leave();
  } catch (err) {
    console.error(err);
    ctx.reply("Oopss.. there something wrong boss, please try again later!");
  }
});
const amaWizard = new import_telegraf.Scenes.BaseScene("ama");
amaWizard.enter((ctx) => ctx.reply("Give me your question boss, I would like to help!"));
amaWizard.on((0, import_filters.message)("text"), async (ctx) => {
  const question = ctx.message.text;
  try {
    ctx.reply("Hang on boss.. this might take a while.");
    const response = await myAI.askRandom(question);
    ctx.reply(response);
    return ctx.scene.leave();
  } catch (err) {
    console.error(err);
    ctx.reply("Oopss.. there something wrong boss, please try again later!");
  }
});
const writeCodeWizard = new import_telegraf.Scenes.BaseScene("writecode");
writeCodeWizard.enter((ctx) => ctx.reply(`Give me your question boss!
Note: Check https://platform.openai.com/docs/guides/code to maximize the use of me on this.`));
writeCodeWizard.on((0, import_filters.message)("text"), async (ctx) => {
  const instruction = ctx.message.text;
  try {
    ctx.reply("Hang on boss.. this might take a while.");
    const response = await myAI.writeCode(instruction);
    ctx.reply(response);
    return ctx.scene.leave();
  } catch (err) {
    console.error(err);
    ctx.reply("Oopss.. there something wrong boss, please try again later!");
  }
});
const explainCodeWizard = new import_telegraf.Scenes.BaseScene("explaincode");
explainCodeWizard.enter((ctx) => ctx.reply(`Give me that hard code boss, I would like to help explain it!
Note: Check https://platform.openai.com/docs/guides/code to maximize the use of me on this.`));
explainCodeWizard.on((0, import_filters.message)("text"), async (ctx) => {
  const codes = ctx.message.text;
  try {
    ctx.reply("Hang on boss.. this might take a while.");
    const response = await myAI.explainCode(codes);
    ctx.reply(response);
    return ctx.scene.leave();
  } catch (err) {
    console.error(err);
    ctx.reply("Oopss.. there something wrong boss, please try again later!");
  }
});
const brainstormWizard = new import_telegraf.Scenes.BaseScene("brainstorm");
brainstormWizard.enter((ctx) => ctx.reply(`what is it that you want me to brainstorm?`));
brainstormWizard.on((0, import_filters.message)("text"), async (ctx) => {
  const topic = ctx.message.text;
  try {
    ctx.reply("Hang on boss.. this might take a while.");
    const response = await myAI.brainstorm(topic);
    ctx.reply(response);
    return ctx.scene.leave();
  } catch (err) {
    console.error(err);
    ctx.reply("Oopss.. there something wrong boss, please try again later!");
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  amaWizard,
  brainstormWizard,
  explainCodeWizard,
  tldrWizard,
  writeCodeWizard
});
//# sourceMappingURL=wizard.js.map
