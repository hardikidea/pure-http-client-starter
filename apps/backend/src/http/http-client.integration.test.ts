import { HttpClient } from './http-client';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import express, { Express, Request, Response } from 'express';
import { Server } from 'http';

describe('HttpClient', () => {
  describe('HttpClient with real server', () => {
    it('should succeed for get with valid path', async (): Promise<void> => {
      const result = await subject.makeRequest('get', `http://127.0.0.1:${port}/`);
      expect(result.status).toBe(200);
      expect(result.data.message).toBe('success');
      expect(result.data.request.method).toBe('GET');
    });

    it('should succeed for post with valid path', async (): Promise<void> => {
      const requestBody = { my: 'data' };
      const result = await subject.makeRequest('post', `http://127.0.0.1:${port}/`, requestBody, {
        headers: { someheader: 'someheader' },
      });
      expect(result.status).toBe(200);
      expect(result.data.message).toBe('success');
      expect(result.data.request.method).toBe('POST');
      expect(result.data.request.path).toBe('/');
      expect(result.data.request.headers['someheader']).toBe('someheader');
      expect(result.data.request.body).toEqual(requestBody);
    });

    it('should fail for get with bad path', async (): Promise<void> => {
      try {
        await subject.makeRequest('get', `http://127.0.0.1:${port}/bad`);
      } catch (error: any) {
        if (error.response) {
          expect(error.response.status).toBe(404);
        } else {
          throw error;
        }
      }
    });

    it('should fail for get with error path', async (): Promise<void> => {
      try {
        await subject.makeRequest('get', `http://127.0.0.1:${port}/error`);
      } catch (error: any) {
        if (error.response) {
          expect(error.response.status).toBe(500);
        } else {
          throw error;
        }
      }
    }, 2000);
  });
});

let server: Server;
let subject: HttpClient;
const port = 5003;

const getTestExpressServer = (): Express => {
  const app = express();
  app.use(express.json());

  const captureRequest = (req: Request, res: Response): void => {
    const requestDetails = {
      method: req.method,
      path: req.path,
      headers: req.headers,
      body: req.body,
    };
    res.status(200).json({
      message: 'success',
      request: requestDetails,
    });
  };

  app.get('/', captureRequest);
  app.post('/', captureRequest);
  app.put('/', captureRequest);
  app.delete('/', captureRequest);
  app.get('/error', (req: Request, res: Response): void => {
    res.status(500).json({
      message: 'ERROR ROUTE',
      request: {
        method: req.method,
        path: req.path,
        headers: req.headers,
        body: req.body,
      },
    });
  });

  return app;
};

beforeAll(async (): Promise<void> => {
  const app = getTestExpressServer();
  server = app.listen(port, '0.0.0.0', () => {});
  subject = new HttpClient();
});

afterAll(async (): Promise<void> => {
  server.close((err: any): void => {
    if (err) {
      console.error('Error closing the server:', err);
    }
  });
});
