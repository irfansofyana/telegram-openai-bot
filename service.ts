import { MyOpenAI } from "./client"

export class AIService {
  client: MyOpenAI

  constructor() {
    this.client = new MyOpenAI();
  }

  public async tldr(text: string): Promise<string> {
    return this.client.tldr(text);
  }

  public async ama(text: string): Promise<string> {
    return this.client.ama(text);
  }

  public async writeCode(text: string): Promise<string> {
    return this.client.writeCode(text);
  }

  public async explainCode(text: string): Promise<string> {
    return this.client.explainCode(text);
  }

  public async brainstorm(text: string): Promise<string> {
    return this.client.brainstorm(text);
  }

  public async chat(text: string): Promise<string> {
    return this.client.chat(text);
  }
}