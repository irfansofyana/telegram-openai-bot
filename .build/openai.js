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
var openai_exports = {};
__export(openai_exports, {
  MyOpenAI: () => MyOpenAI
});
module.exports = __toCommonJS(openai_exports);
var import_openai = require("openai");
class MyOpenAI {
  client;
  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    const configuration = new import_openai.Configuration({
      apiKey
    });
    this.client = new import_openai.OpenAIApi(configuration);
  }
  async writeCode(text) {
    const response = await this.client.createCompletion({
      model: "code-davinci-002",
      prompt: text,
      temperature: 0,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 300
    });
    return response.data.choices[0].text;
  }
  async explainCode(code) {
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
      stop: [`"""`]
    });
    return response.data.choices[0].text;
  }
  async tldr(text) {
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
    return response.data.choices[0].text;
  }
  async brainstorm(text) {
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
    return response.data.choices[0].text;
  }
  async askRandom(text) {
    const response = await this.client.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0.7,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.5
    });
    return response.data.choices[0].text || `I don't know the answer`;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MyOpenAI
});
//# sourceMappingURL=openai.js.map
