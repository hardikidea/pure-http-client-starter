import { Response } from 'express';

export function testResponse(): Response {
  return new TestResponse() as unknown as Response;
}

export class TestResponse {
  statusCode = 200;
  body: unknown = {};

  status(statusCode: number): this {
    this.statusCode = statusCode;
    return this;
  }

  send(body: unknown): this {
    this.body = body;
    return this;
  }
}
