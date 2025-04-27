import { toHttpRequest } from './request';
import { Request } from 'express';
import z from 'zod';
import { InvalidRequestError } from '../routers/middleware/invalid-request-error';

describe('request', () => {
  describe('receive body', () => {
    const schema = z.object({
      id: z.number(),
      name: z.string(),
    });

    it('receives on valid request', () => {
      const body = { id: 1, name: 'Frank' };
      const request = createRequest({ body });
      expect(request.receiveBody(schema)).toEqual(body);
    });

    it('throws InvalidRequest on invalid request', () => {
      const body = { id: 1 };
      const request = createRequest({ body });
      expect(() => request.receiveBody(schema)).toThrowError(InvalidRequestError);
    });
  });

  describe('receive url parameters', () => {
    const schema = z.object({
      user: z.number(),
    });

    it('receives on valid request', () => {
      const params = { user: 123 };
      const request = createRequest({ params });
      expect(request.receiveUrl(schema)).toEqual(params);
    });

    it('throws InvalidRequest on invalid request', () => {
      const params = {};
      const request = createRequest({ params });
      expect(() => request.receiveUrl(schema)).toThrowError(InvalidRequestError);
    });
  });

  describe('receive query parameters', () => {
    const schema = z.object({
      queryString: z.string(),
    });

    it('receives on valid request', () => {
      const query = { queryString: '123' };
      const request = createRequest({ query });
      expect(request.receiveQuery(schema)).toEqual(query);
    });

    it('throws InvalidRequest on invalid request', () => {
      const query = {};
      const request = createRequest({ query });
      expect(() => request.receiveQuery(schema)).toThrowError(InvalidRequestError);
    });
  });

  function createRequest({
    body = {},
    params = {},
    query = {},
  }: { body?: any; params?: any; query?: any } = {}) {
    return toHttpRequest(expressRequest({ body, params, query }));
  }
});

function expressRequest({
  body = {},
  params = {},
  query = {},
}: { body?: any; params?: any; query?: any } = {}) {
  return {
    body,
    params,
    query,
  } as unknown as Request;
}
