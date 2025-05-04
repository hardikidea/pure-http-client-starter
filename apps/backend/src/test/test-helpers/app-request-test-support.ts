import express, { Application } from 'express';
import { IncomingHttpHeaders } from 'http';
import supertest from 'supertest';
import { ApiServer } from '../../app/api-server';
import { Router } from '../../routers/router';

export type TestHttpClientWithAuth = TestHttpClient & {
  withAuthToken: (authToken: string) => TestHttpClient;
};

export const testHttpClient = (app: Application): TestHttpClientWithAuth => {
  const requestAgent = superTestRequest(app);
  return {
    ...requestAgent,
    withAuthToken: (authToken: string) => {
      return superTestRequest(app, authToken);
    },
  };
};

export const testApiServer = (routers: Router) => {
  const app = ApiServer.create({ routers: [routers] }, express());
  return testHttpClient(app.app);
};

export interface TestHttpClient {
  post<TResponse = unknown, TBody = unknown>(
    url: string,
    body: TBody,
    headers?: IncomingHttpHeaders,
  ): Promise<Response<TResponse>>;

  get<TResponse = unknown>(
    url: string,
    headers?: IncomingHttpHeaders,
  ): Promise<Response<TResponse>>;

  put<TResponse = unknown, TBody = unknown>(
    url: string,
    body: TBody,
    headers?: IncomingHttpHeaders,
  ): Promise<Response<TResponse>>;

  delete<TResponse = unknown>(
    url: string,
    headers?: IncomingHttpHeaders,
  ): Promise<Response<TResponse>>;

  purge<TResponse = unknown>(
    url: string,
    headers?: IncomingHttpHeaders,
  ): Promise<Response<TResponse>>;
}

export interface Response<T> {
  body: T;
  status: number;
}

export const superTestRequest = (app: Application, authToken?: string): TestHttpClient => {
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (authToken) {
    requestHeaders.authorization = `Bearer ${authToken}`;
  }

  return {
    post: async <TResponse = unknown, TBody = unknown>(
      url: string,
      data: TBody,
      headers: IncomingHttpHeaders = {},
    ): Promise<Response<TResponse>> => {
      const res = await supertest
        .agent(app)
        .post(url)
        .set({ ...requestHeaders, ...headers })
        .send(data as object);
      return { body: res.body, status: res.status };
    },

    get: async <TResponse = unknown>(
      url: string,
      headers: IncomingHttpHeaders = {},
    ): Promise<Response<TResponse>> => {
      const res = await supertest
        .agent(app)
        .get(url)
        .set({ ...requestHeaders, ...headers });
      return { body: res.body, status: res.status };
    },

    put: async <TResponse = unknown, TBody = unknown>(
      url: string,
      body: TBody,
      headers: IncomingHttpHeaders = {},
    ): Promise<Response<TResponse>> => {
      const res = await supertest
        .agent(app)
        .put(url)
        .set({ ...requestHeaders, ...headers })
        .send(body);
      return { body: res.body, status: res.status };
    },

    delete: async <TResponse = unknown>(
      url: string,
      headers: IncomingHttpHeaders = {},
    ): Promise<Response<TResponse>> => {
      const res = await supertest
        .agent(app)
        .delete(url)
        .set({ ...requestHeaders, ...headers });
      return { body: res.body, status: res.status };
    },

    purge: async <TResponse = unknown>(
      url: string,
      headers: IncomingHttpHeaders = {},
    ): Promise<Response<TResponse>> => {
      const res = await supertest
        .agent(app)
        .purge(url)
        .set({ ...requestHeaders, ...headers });
      return { body: res.body, status: res.status };
    },
  };
};
