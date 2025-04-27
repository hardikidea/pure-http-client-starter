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
    }
  };
};

export const testApiServer = (routers: Router) => {
  const app = ApiServer.create({ routers: [routers] }, express());
  return testHttpClient(app.app);
};

export interface TestHttpClient {
  post<TResponse = any, TBody = any>(url: string, body: TBody, headers?: IncomingHttpHeaders): Promise<Response<TResponse>>;

  get<TResponse = any>(url: string, headers?: IncomingHttpHeaders): Promise<Response<TResponse>>;

  put(url: string, body: any, headers?: IncomingHttpHeaders): any;

  delete(url: string, headers?: IncomingHttpHeaders): any;

  purge(url: string, headers?: IncomingHttpHeaders): any;
}

export interface Response<T> {
  body: T;
  status: number;
}

export const superTestRequest = (app: Application, authToken?: string): TestHttpClient => {
  const requestHeaders: any = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };

  if (authToken) {
    requestHeaders.authorization = `Bearer ${authToken}`;
  }

  return {
    post: <TResponse = any, TBody = any>(url: string, data: TBody, headers: IncomingHttpHeaders = {}): Promise<Response<TResponse>> =>
      supertest
        .agent(app)
        .post(url)
        .set({ ...requestHeaders, ...headers })
        .send(data as object),
    get: (url: string, headers: IncomingHttpHeaders = {}) =>
      supertest
        .agent(app)
        .get(url)
        .set({ ...requestHeaders, ...headers }),
    put: (url: string, body: any, headers: IncomingHttpHeaders = {}) =>
      supertest
        .agent(app)
        .put(url)
        .set({ ...requestHeaders, ...headers })
        .send(body),
    delete: (url: string, headers: IncomingHttpHeaders = {}) =>
      supertest
        .agent(app)
        .delete(url)
        .set({ ...requestHeaders, ...headers }),
    purge: (url: string, headers: IncomingHttpHeaders = {}) =>
      supertest
        .agent(app)
        .purge(url)
        .set({ ...requestHeaders, ...headers })
  };
};
