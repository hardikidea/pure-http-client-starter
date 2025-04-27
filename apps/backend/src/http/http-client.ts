import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import { EventEmitter } from 'stream';
import ConfigurableResponses from './configurable-response';
import logger from '../loggers/logger';
import { OutputTracker } from '../utils/outputTracker';

export interface SetOutputData {
  method: 'post';
  url: string;
  body?: Record<string, unknown>;
}

const emitter = new EventEmitter();

emitter.on('error', () => {});

export function httpClientOutputTracker(): OutputTracker<SetOutputData> {
  return new OutputTracker<SetOutputData>(emitter, 'post');
}

export class HttpClient {
  private http: AxiosInstance;

  constructor(httpInstance?: AxiosInstance) {
    if (httpInstance) {
      this.http = httpInstance;
    } else {
      this.http = axios.create();
      axiosRetry(this.http, {
        retries: 3,
        retryDelay: axiosRetry.exponentialDelay,
        onRetry: (_error, retryCount, requestConfig) => {
          logger.info(`Retry attempt #${retryCount} for request to ${requestConfig.url}`);
        },
      });
    }
  }

  static createNull(options?: StubbedAxiosOptions): HttpClient {
    const instance: AxiosInstance = StubbedAxios.create(options);
    return new HttpClient(instance);
  }

  async makeRequest(
    method: 'get' | 'post',
    url: string,
    body?: Record<string, unknown>,
    opts: {
      headers?: Record<string, string>;
      auth?: { username: string; password: string };
      params?: URLSearchParams;
    } = {},
  ): Promise<AxiosResponse> {
    try {
      const requestConfig: AxiosRequestConfig = {
        headers: {
          ...opts.headers,
        },
        data: body,
      };
      if (opts.auth) {
        requestConfig.auth = {
          username: opts.auth.username,
          password: opts.auth.password,
        };
      }
      if (opts.params) {
        requestConfig.params = opts.params;
      }
      const response =
        method === 'get'
          ? await this.http.get(url, requestConfig)
          : await this.http.post(url, body, requestConfig);
      if (method === 'post') {
        emitter.emit('post', { method, url, body, requestConfig });
      }
      return response;
    } catch (err) {
      if (err instanceof AxiosError) {
        const { response } = err;
        console.error(
          `API Client Request Failed: ${method.toUpperCase()} ${url}`,
          JSON.stringify(
            {
              status: response?.status,
              statusText: response?.statusText,
              response: response?.data,
            },
            null,
            4,
          ),
        );
      }
      throw err;
    }
  }
}

export interface StubbedAxiosOptions {
  shouldThrow?: boolean;
  configuredResponse?: Record<string, unknown>;
}

class StubbedAxios {
  static create(options?: StubbedAxiosOptions): AxiosInstance {
    const configurableResponses = ConfigurableResponses.mapObject(
      options?.configuredResponse || {},
    );

    const instance = {
      request: async <T = unknown, R = AxiosResponse<T>>(
        config: AxiosRequestConfig,
      ): Promise<R> => {
        const url = config.url!;
        if (options?.shouldThrow) {
          throw new AxiosError('Stubbed Axios Error');
        }
        if (configurableResponses[url]) {
          return { data: configurableResponses[url].next() } as R;
        }
        throw new Error(`No response configured for URL: ${url}`);
      },
      get: async <T = unknown, R = AxiosResponse<T>>(
        url: string,
        config?: AxiosRequestConfig,
      ): Promise<R> => {
        return instance.request<T, R>({ ...config, method: 'get', url });
      },
      post: async <T = unknown, R = AxiosResponse<T>>(
        url: string,
        data?: Record<string, unknown>,
        config?: AxiosRequestConfig,
      ): Promise<R> => {
        return instance.request<T, R>({ ...config, method: 'post', url, data });
      },
    } as unknown as AxiosInstance;

    return instance;
  }
}
