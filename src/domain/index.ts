export interface TextResponse {
  text: string;
  usage_tokens: {
    prompt: number;
    completion: number;
    total: number;
  };
}

export function constructTextResponse(r: TextResponse): string {
  let response = r.text + '\n';
  response += '\n```\n'
  response += 'Usage tokens:\n';
  response += `- Prompt tokens: ${r.usage_tokens.prompt}\n`;
  response += `- Completion tokens: ${r.usage_tokens.completion}\n`;
  response += `- Total tokens: ${r.usage_tokens.total}\n`;
  response += '\n```\n'

  return response;
}
