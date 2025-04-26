import { EventEmitter } from 'events';

export interface HttpRequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  headers?: Record<string, string>;
  body?: unknown;
}

export interface HttpResponse<T = unknown> {
  status: number;
  data: T;
  headers: Record<string, string>;
}

export class PureHttpClientManager extends EventEmitter {
  async send<T>(options: HttpRequestOptions): Promise<HttpResponse<T>> {
    const { method, url, headers = {}, body } = options;

    console.log(`[HttpClientManager] Sending ${method} request to ${url}`);

    // Simulate an HTTP response
    return {
      status: 200,
      data: { message: 'Sample response' } as unknown as T,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
}
