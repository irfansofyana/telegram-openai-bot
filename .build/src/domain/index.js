'use strict';
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
  }
  return to;
};
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, '__esModule', { value: true }), mod);
var domain_exports = {};
__export(domain_exports, {
  constructTextResponse: () => constructTextResponse
});
module.exports = __toCommonJS(domain_exports);
function constructTextResponse(r) {
  let response = r.text + '\n';
  response += '\n```\n';
  response += 'Usage tokens:\n';
  response += `- Prompt tokens: ${r.usage_tokens.prompt}
`;
  response += `- Completion tokens: ${r.usage_tokens.completion}
`;
  response += `- Total tokens: ${r.usage_tokens.total}
`;
  response += '\n```\n';
  return response;
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    constructTextResponse
  });
//# sourceMappingURL=index.js.map
