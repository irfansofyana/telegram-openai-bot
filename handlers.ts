import { Scenes } from 'telegraf';
import { message } from 'telegraf/filters';
import { MyOpenAI } from './client';

const myAI = new MyOpenAI();

export const tldr = new Scenes.BaseScene('tldr');
tldr.enter(ctx => ctx.reply('Please give me the text boss'));
tldr.on(message('text'), async ctx => {
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

export const ama = new Scenes.BaseScene('ama');
ama.enter(ctx => ctx.reply('Give me your question boss, I would like to help!'));
ama.on(message('text'), async ctx => {
  const question = ctx.message.text;
  try {
    ctx.reply('Hang on boss.. this might take a while.');
    const response = await myAI.ama(question);
    ctx.reply(response);
    return ctx.scene.leave();
  } catch (err) {
    console.error(err);
    ctx.reply('Oopss.. there something wrong boss, please try again later!');
  }
});

export const writeCode = new Scenes.BaseScene('writecode');
writeCode.enter(ctx => ctx.reply(`Give me your question boss!\nNote: Check https://platform.openai.com/docs/guides/code to maximize the use of me on this.`));
writeCode.on(message('text'), async ctx => {
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

export const explainCode = new Scenes.BaseScene('explaincode');
explainCode.enter(ctx => ctx.reply(`Give me that hard code boss, I would like to help explain it!\nNote: Check https://platform.openai.com/docs/guides/code to maximize the use of me on this.`));
explainCode.on(message('text'), async ctx => {
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

export const brainstorm = new Scenes.BaseScene('brainstorm');
brainstorm.enter(ctx => ctx.reply('what do we want to brainstorm?boss?'));
brainstorm.on(message('text'), async ctx => {
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

export const image = new Scenes.BaseScene('image');
image.enter(ctx => ctx.reply('what kind of image that you want to create, boss?'));
image.on(message('text'), async ctx => {
  const text = ctx.message.text;
  try {
    const response = await myAI.createImage(text);
    ctx.replyWithPhoto({ url: response });
    return ctx.scene.leave();
  } catch (err) {
    console.error(err);
    ctx.reply('Oopss.. there something wrong boss, please try again later!');
  }
});

export const chat = async (ctx: any) => {
  const text = ctx.message.text;
  try {
    const response = await myAI.chat(text);
    ctx.reply(response);
  } catch (err) {
    console.error(err);
    ctx.reply('Oopss.. there something wrong boss, please try again later!');
  }
}