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
var service_exports = {};
__export(service_exports, {
  AIService: () => AIService
});
module.exports = __toCommonJS(service_exports);
var import_client = require("./client");
class AIService {
  client;
  constructor() {
    this.client = new import_client.MyOpenAI();
  }
  async tldr(text) {
    return this.client.tldr(text);
  }
  async ama(text) {
    return this.client.ama(text);
  }
  async writeCode(text) {
    return this.client.writeCode(text);
  }
  async explainCode(text) {
    return this.client.explainCode(text);
  }
  async brainstorm(text) {
    return this.client.brainstorm(text);
  }
  async chat(text) {
    return this.client.chat(text);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AIService
});
//# sourceMappingURL=service.js.map
