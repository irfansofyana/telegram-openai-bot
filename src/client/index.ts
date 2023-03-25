import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai';
import { TextResponse } from '../domain';

export class MyOpenAI {
  client: OpenAIApi;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    const configuration = new Configuration({
      apiKey
    });

    this.client = new OpenAIApi(configuration);
  }

  private buildAIResponse(
    text: string,
    usage: {
      prompt_tokens: number | undefined;
      completion_tokens: number | undefined;
      total_tokens: number | undefined;
    }
  ): TextResponse {
    return {
      text: text,
      usage_tokens: {
        prompt: Number(usage.prompt_tokens),
        completion: Number(usage.completion_tokens),
        total: Number(usage.total_tokens)
      }
    };
  }

  public async writeCode(text: string): Promise<TextResponse> {
    const response = await this.client.createCompletion({
      model: 'code-davinci-002',
      prompt: text,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      max_tokens: 300
    });

    return this.buildAIResponse(response.data.choices[0].text as string, {
      prompt_tokens: response.data.usage?.prompt_tokens,
      completion_tokens: response.data.usage?.completion_tokens,
      total_tokens: response.data.usage?.total_tokens
    });
  }

  public async explainCode(code: string): Promise<TextResponse> {
    code += '\n"""\n Here\'s what the above code is doing:\n1. ';
    const response = await this.client.createCompletion({
      model: 'code-davinci-002',
      prompt: code,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      max_tokens: 300,
      stop: ['"""']
    });

    return this.buildAIResponse(response.data.choices[0].text as string, {
      prompt_tokens: response.data.usage?.prompt_tokens,
      completion_tokens: response.data.usage?.completion_tokens,
      total_tokens: response.data.usage?.total_tokens
    });
  }

  public async tldr(text: string): Promise<TextResponse> {
    text += '\nTl;dr\n';

    const response = await this.client.createCompletion({
      model: 'text-davinci-003',
      prompt: text,
      temperature: 0.7,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 1.0,
      max_tokens: 200
    });

    return this.buildAIResponse(response.data.choices[0].text as string, {
      prompt_tokens: response.data.usage?.prompt_tokens,
      completion_tokens: response.data.usage?.completion_tokens,
      total_tokens: response.data.usage?.total_tokens
    });
  }

  public async brainstorm(text: string): Promise<TextResponse> {
    text += "\nLet's think step by step.";

    const response = await this.client.createCompletion({
      model: 'text-davinci-003',
      prompt: text,
      temperature: 0.69,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 0.57,
      stop: ['###']
    });

    return this.buildAIResponse(response.data.choices[0].text as string, {
      prompt_tokens: response.data.usage?.prompt_tokens,
      completion_tokens: response.data.usage?.completion_tokens,
      total_tokens: response.data.usage?.total_tokens
    });
  }

  public async ama(text: string): Promise<TextResponse> {
    const response = await this.client.createCompletion({
      model: 'text-davinci-003',
      prompt: text,
      temperature: 0.7,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.5
    });

    return this.buildAIResponse(response.data.choices[0].text as string, {
      prompt_tokens: response.data.usage?.prompt_tokens,
      completion_tokens: response.data.usage?.completion_tokens,
      total_tokens: response.data.usage?.total_tokens
    });
  }

  public async chat(
    messages: ChatCompletionRequestMessage[]
  ): Promise<TextResponse> {
    const response = await this.client.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0
    });

    return this.buildAIResponse(
      response.data.choices[0].message?.content as string,
      {
        prompt_tokens: response.data.usage?.prompt_tokens,
        completion_tokens: response.data.usage?.completion_tokens,
        total_tokens: response.data.usage?.total_tokens
      }
    );
  }

  public async oneTimeChat(text: string): Promise<TextResponse> {
    const response = await this.client.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            "You're a helpful assistant who can answer the general question from users very clearly and concisely. But in case you are unsure or you don't know about the answer, please respond with an apology"
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.7
    });

    return this.buildAIResponse(
      response.data.choices[0].message?.content as string,
      {
        prompt_tokens: response.data.usage?.prompt_tokens,
        completion_tokens: response.data.usage?.completion_tokens,
        total_tokens: response.data.usage?.total_tokens
      }
    );
  }

  public async createImage(text: string): Promise<string> {
    const response = await this.client.createImage({
      prompt: text,
      size: '256x256',
      response_format: 'url'
    });

    return response.data.data[0].url as string;
  }
}
