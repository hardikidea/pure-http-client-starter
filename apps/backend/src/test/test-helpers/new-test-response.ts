import { Response } from 'express';

export function testResponse(): Response {
  return new TestResponse() as unknown as Response;
}

export class TestResponse {
  statusCode = 200;
  body: any = {};

  status(statusCode: number) {
    this.statusCode = statusCode;
    return this;
  }

  send(body: any) {
    this.body = body;
    return this;
  }
}
