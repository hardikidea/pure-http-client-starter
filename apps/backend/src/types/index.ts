import { RequestHandler } from 'express';

export type ReplaceReturnType<T, TNewReturn> = T extends (...args: infer Args) => unknown
  ? (...args: Args) => TNewReturn
  : never;

export type AsyncRequestHandler = ReplaceReturnType<RequestHandler, Promise<void>>;
