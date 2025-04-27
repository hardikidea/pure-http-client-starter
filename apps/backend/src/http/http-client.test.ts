import { HttpClient, httpClientOutputTracker } from './http-client';
import { describe, expect, it } from 'vitest';

describe('HttpClient', () => {
  describe('with StubbedAxios', () => {
    it('GET request should return expected response', async () => {
      const data = {
        users: [
          { id: 1, name: 'John Doe' },
          { id: 2, name: 'Jane Doe' },
        ],
      };

      const httpClient: HttpClient = HttpClient.createNull({
        configuredResponse: {
          'https://api.example.com/users': data,
        },
      });
      const response = await httpClient.makeRequest('get', 'https://api.example.com/users');
      expect(response.data).toEqual(data);
    });

    it('GET request should throw error', async () => {
      const httpClient: HttpClient = HttpClient.createNull({ shouldThrow: true });
      await expect(
        httpClient.makeRequest('get', 'https://api.example.com/users'),
      ).rejects.toThrowError('Stubbed Axios Error');
    });

    it('POST request should be as expected', async () => {
      const httpClient: HttpClient = HttpClient.createNull({
        configuredResponse: {
          'https://api.example.com/users': { success: true },
        },
      });
      const output = httpClientOutputTracker();
      const requestBody = { name: 'John Doe', email: 'john@example.com' };
      await httpClient.makeRequest('post', 'https://api.example.com/users', requestBody);

      expect(output.data).toEqual([
        {
          method: 'post',
          url: 'https://api.example.com/users',
          body: requestBody,
          requestConfig: {
            headers: {},
            data: requestBody,
          },
        },
      ]);
    });
  });
});
