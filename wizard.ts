import { MyOpenAI } from './openai';
import { Scenes } from 'telegraf';
import { message } from "telegraf/filters";

const myAI = new MyOpenAI();

export const tldrWizard = new Scenes.BaseScene('tldr');

tldrWizard.enter(ctx => ctx.reply('Please give me the text boss'));

tldrWizard.on(message("text"), async ctx => {
  const textInput = ctx.message.text;
  try {
    ctx.reply('Hang on boss.. this might take a while.');
    const response = await myAI.tldr(textInput);
    ctx.reply(response);
    return ctx.scene.leave();
  } catch (err) {
    console.error(err);
    ctx.reply('Oopss.. there something wrong boss, please try again later!');
  }
});

export const amaWizard = new Scenes.BaseScene('ama');

amaWizard.enter(ctx => ctx.reply('Give me your question boss, I would like to help!'));

amaWizard.on(message("text"), async ctx => {
  const question = ctx.message.text;
  try {
    ctx.reply('Hang on boss.. this might take a while.');
    const response = await myAI.askRandom(question);
    ctx.reply(response);
    return ctx.scene.leave();
  } catch (err) {
    console.error(err);
    ctx.reply('Oopss.. there something wrong boss, please try again later!');
  }
});

export const writeCodeWizard = new Scenes.BaseScene('writecode');

writeCodeWizard.enter(ctx => ctx.reply(`Give me your question boss!\nNote: Check https://platform.openai.com/docs/guides/code to maximize the use of me on this.`));

writeCodeWizard.on(message("text"), async ctx => {
  const instruction = ctx.message.text;
  try {
    ctx.reply('Hang on boss.. this might take a while.');
    const response = await myAI.writeCode(instruction);
    ctx.reply(response);
    return ctx.scene.leave();
  } catch (err) {
    console.error(err);
    ctx.reply('Oopss.. there something wrong boss, please try again later!');
  }
});

export const explainCodeWizard = new Scenes.BaseScene('explaincode');

explainCodeWizard.enter(ctx => ctx.reply(`Give me that hard code boss, I would like to help explain it!\nNote: Check https://platform.openai.com/docs/guides/code to maximize the use of me on this.`));

explainCodeWizard.on(message("text"), async ctx => {
  const codes = ctx.message.text;
  try {
    ctx.reply('Hang on boss.. this might take a while.');
    const response = await myAI.explainCode(codes);
    ctx.reply(response);
    return ctx.scene.leave();
  } catch (err) {
    console.error(err);
    ctx.reply('Oopss.. there something wrong boss, please try again later!');
  }
});

export const brainstormWizard = new Scenes.BaseScene('brainstorm');

brainstormWizard.enter(ctx => ctx.reply(`what is it that you want me to brainstorm?`));

brainstormWizard.on(message("text"), async ctx => {
  const topic = ctx.message.text;
  try {
    ctx.reply('Hang on boss.. this might take a while.');
    const response = await myAI.brainstorm(topic);
    ctx.reply(response);
    return ctx.scene.leave();
  } catch (err) {
    console.error(err);
    ctx.reply('Oopss.. there something wrong boss, please try again later!');
  }
});