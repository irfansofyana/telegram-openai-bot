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
var client_exports = {};
__export(client_exports, {
  MyOpenAI: () => MyOpenAI
});
module.exports = __toCommonJS(client_exports);
var import_openai = require("openai");
var import_config = require("../config");
class MyOpenAI {
  client;
  constructor() {
    const apiKey = import_config.openAIAPIKey;
    const configuration = new import_openai.Configuration({
      apiKey
    });
    this.client = new import_openai.OpenAIApi(configuration);
  }
  buildAIResponse(text, usage) {
    return {
      text,
      usage_tokens: {
        prompt: Number(usage.prompt_tokens),
        completion: Number(usage.completion_tokens),
        total: Number(usage.total_tokens)
      }
    };
  }
  async writeCode(text) {
    var _a, _b, _c;
    const response = await this.client.createCompletion({
      model: "code-davinci-002",
      prompt: text,
      temperature: 0,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 300
    });
    return this.buildAIResponse(response.data.choices[0].text, {
      prompt_tokens: (_a = response.data.usage) == null ? void 0 : _a.prompt_tokens,
      completion_tokens: (_b = response.data.usage) == null ? void 0 : _b.completion_tokens,
      total_tokens: (_c = response.data.usage) == null ? void 0 : _c.total_tokens
    });
  }
  async explainCode(code) {
    var _a, _b, _c;
    code += `
"""
 Here's what the above code is doing:
1. `;
    const response = await this.client.createCompletion({
      model: "code-davinci-002",
      prompt: code,
      temperature: 0,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 300,
      stop: ['"""']
    });
    return this.buildAIResponse(response.data.choices[0].text, {
      prompt_tokens: (_a = response.data.usage) == null ? void 0 : _a.prompt_tokens,
      completion_tokens: (_b = response.data.usage) == null ? void 0 : _b.completion_tokens,
      total_tokens: (_c = response.data.usage) == null ? void 0 : _c.total_tokens
    });
  }
  async tldr(text) {
    var _a, _b, _c;
    text += "\nTl;dr\n";
    const response = await this.client.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 1,
      max_tokens: 200
    });
    return this.buildAIResponse(response.data.choices[0].text, {
      prompt_tokens: (_a = response.data.usage) == null ? void 0 : _a.prompt_tokens,
      completion_tokens: (_b = response.data.usage) == null ? void 0 : _b.completion_tokens,
      total_tokens: (_c = response.data.usage) == null ? void 0 : _c.total_tokens
    });
  }
  async brainstorm(text) {
    var _a, _b, _c;
    text += "\nLet's think step by step.";
    const response = await this.client.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0.69,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 0.57,
      stop: ["###"]
    });
    return this.buildAIResponse(response.data.choices[0].text, {
      prompt_tokens: (_a = response.data.usage) == null ? void 0 : _a.prompt_tokens,
      completion_tokens: (_b = response.data.usage) == null ? void 0 : _b.completion_tokens,
      total_tokens: (_c = response.data.usage) == null ? void 0 : _c.total_tokens
    });
  }
  async ama(text) {
    var _a, _b, _c;
    const response = await this.client.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0.7,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.5
    });
    return this.buildAIResponse(response.data.choices[0].text, {
      prompt_tokens: (_a = response.data.usage) == null ? void 0 : _a.prompt_tokens,
      completion_tokens: (_b = response.data.usage) == null ? void 0 : _b.completion_tokens,
      total_tokens: (_c = response.data.usage) == null ? void 0 : _c.total_tokens
    });
  }
  async chat(messages) {
    var _a, _b, _c, _d;
    const response = await this.client.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0
    });
    return this.buildAIResponse(
      (_a = response.data.choices[0].message) == null ? void 0 : _a.content,
      {
        prompt_tokens: (_b = response.data.usage) == null ? void 0 : _b.prompt_tokens,
        completion_tokens: (_c = response.data.usage) == null ? void 0 : _c.completion_tokens,
        total_tokens: (_d = response.data.usage) == null ? void 0 : _d.total_tokens
      }
    );
  }
  async oneTimeChat(text) {
    var _a, _b, _c, _d;
    const response = await this.client.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You're a helpful assistant who can answer the general question from users very clearly and concisely. But in case you are unsure or you don't know about the answer, please respond with an apology"
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.7
    });
    return this.buildAIResponse(
      (_a = response.data.choices[0].message) == null ? void 0 : _a.content,
      {
        prompt_tokens: (_b = response.data.usage) == null ? void 0 : _b.prompt_tokens,
        completion_tokens: (_c = response.data.usage) == null ? void 0 : _c.completion_tokens,
        total_tokens: (_d = response.data.usage) == null ? void 0 : _d.total_tokens
      }
    );
  }
  async createImage(text) {
    const response = await this.client.createImage({
      prompt: text,
      size: "256x256",
      response_format: "url"
    });
    return response.data.data[0].url;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MyOpenAI
});
//# sourceMappingURL=index.js.map
