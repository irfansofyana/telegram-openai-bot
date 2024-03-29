import { Scenes } from 'telegraf';
import { message } from 'telegraf/filters';
import { MyOpenAI } from '../client';
import { constructTextResponse } from '../domain';

const myAI = new MyOpenAI();

export const tldr = new Scenes.BaseScene('tldr');

tldr.enter(async (ctx) => await ctx.reply('Please give me the text boss'));

tldr.on(message('text'), async (ctx) => {
  const textInput = ctx.message.text;
  try {
    await ctx.reply('Hang on boss.. this might take a while.');
    const response = await myAI.tldr(textInput);
    await ctx.reply(constructTextResponse(response));
    await ctx.scene.leave();
  } catch (err) {
    console.error(err);
    await ctx.reply(
      'Oopss.. there something wrong boss, please try again later!'
    );
  }
});

export const ama = new Scenes.BaseScene('ama');

ama.enter(
  async (ctx) =>
    await ctx.reply('Give me your question boss, I would like to help!')
);

ama.on(message('text'), async (ctx) => {
  const question = ctx.message.text;
  try {
    await ctx.reply('Hang on boss.. this might take a while.');
    const response = await myAI.ama(question);
    await ctx.reply(constructTextResponse(response));
    await ctx.scene.leave();
  } catch (err) {
    console.error(err);
    await ctx.reply(
      'Oopss.. there something wrong boss, please try again later!'
    );
  }
});

export const writeCode = new Scenes.BaseScene('writecode');

writeCode.enter(
  async (ctx) =>
    await ctx.reply(
      'Give me your question boss!\nNote: Check https://platform.openai.com/docs/guides/code to maximize the use of me on this.'
    )
);

writeCode.on(message('text'), async (ctx) => {
  const instruction = ctx.message.text;
  try {
    await ctx.reply('Hang on boss.. this might take a while.');
    const response = await myAI.writeCode(instruction);
    await ctx.reply(constructTextResponse(response));
    await ctx.scene.leave();
  } catch (err) {
    console.error(err);
    await ctx.reply(
      'Oopss.. there something wrong boss, please try again later!'
    );
  }
});

export const explainCode = new Scenes.BaseScene('explaincode');

explainCode.enter(
  async (ctx) =>
    await ctx.reply(
      'Give me that hard code boss, I would like to help explain it!\nNote: Check https://platform.openai.com/docs/guides/code to maximize the use of me on this.'
    )
);

explainCode.on(message('text'), async (ctx) => {
  const codes = ctx.message.text;
  try {
    await ctx.reply('Hang on boss.. this might take a while.');
    const response = await myAI.explainCode(codes);
    await ctx.reply(constructTextResponse(response));
    await ctx.scene.leave();
  } catch (err) {
    console.error(err);
    await ctx.reply(
      'Oopss.. there something wrong boss, please try again later!'
    );
  }
});

export const brainstorm = new Scenes.BaseScene('brainstorm');

brainstorm.enter(
  async (ctx) => await ctx.reply('what do we want to brainstorm?boss?')
);

brainstorm.on(message('text'), async (ctx) => {
  const topic = ctx.message.text;
  try {
    await ctx.reply('Hang on boss.. this might take a while.');
    const response = await myAI.brainstorm(topic);
    await ctx.reply(constructTextResponse(response));
    await ctx.scene.leave();
  } catch (err) {
    console.error(err);
    await ctx.reply(
      'Oopss.. there something wrong boss, please try again later!'
    );
  }
});

export const image = new Scenes.BaseScene('image');

image.enter(
  async (ctx) =>
    await ctx.reply('what kind of image that you want to create, boss?')
);

image.on(message('text'), async (ctx) => {
  const text = ctx.message.text;
  try {
    const response = await myAI.createImage(text);
    await ctx.replyWithPhoto({ url: response });
    await ctx.scene.leave();
  } catch (err) {
    console.error(err);
    await ctx.reply(
      'Oopss.. there something wrong boss, please try again later!'
    );
  }
});

export const convo = new Scenes.BaseScene('convo');
convo.enter(async (ctx) => {
  await ctx.reply(
    `Boss, you're entering conversation mode. I'll try to answer your question the best as I can!`
  );
  ctx.session.data = {
    chat: [
      {
        role: 'system',
        content:
          "You're a helpful assistant who can answer the general question from users very clearly and concisely. But in case you are unsure or you don't know about the answer, please respond with an apology"
      }
    ]
  };
});

convo.command('stopconvo', async (ctx) => {
  ctx.session.data.chat = [];
  await ctx.reply('Thanks for having a great convo with me boss!');
  ctx.scene.leave('convo');
});

convo.on(message('text'), async (ctx) => {
  const text = ctx.message.text;

  ctx.session.data.chat.push({
    role: 'user',
    content: text
  });

  let response;

  try {
    response = await myAI.chat(ctx.session.data.chat);

    ctx.session.data.chat.push({
      role: 'assistant',
      content: response.text
    });
  } catch (err) {
    console.error(err);
    await ctx.reply(
      'Oopss.. there something wrong boss, please type again your question!'
    );

    return;
  }

  try {
    await ctx.replyWithMarkdown(constructTextResponse(response));
  } catch (err) {
    console.error(err);
    await ctx.reply(constructTextResponse(response));
  }

  await ctx.reply(
    'To stop conversation, please use command /stopconvo, thanks boss!'
  );
});

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const chat = async (ctx: any): Promise<void> => {
  const text = ctx.message.text;
  let response;

  try {
    response = await myAI.oneTimeChat(text);
  } catch (err) {
    console.error(err);
    await ctx.reply(
      'Oopss.. there something wrong boss, please try again later!'
    );
    return;
  }

  try {
    await ctx.replyWithMarkdown(constructTextResponse(response));
  } catch (err) {
    console.error(err);
    await ctx.reply(constructTextResponse(response));
  }
};
