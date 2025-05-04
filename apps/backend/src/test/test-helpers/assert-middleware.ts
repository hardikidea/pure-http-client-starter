import { buildTestRequest } from './test-request';
import { buildTestResponse } from './test-response';
import { expect, vi } from 'vitest';
import { Middleware } from '../routers/middleware';

export const assertMiddleware = async (
  handler: Middleware,
  reqValues: Parameters<typeof buildTestRequest>[0],
  expectedStatus?: number,
  expectedResponse?: unknown,
): Promise<void> => {
  const { req } = buildTestRequest(reqValues);
  const res = buildTestResponse();
  const next = vi.fn();

  await handler(req, res, next);

  if (expectedStatus !== undefined) {
    expect(res.status).toHaveBeenCalledWith(expectedStatus);
  } else {
    expect(next).toHaveBeenCalled();
  }

  if (expectedResponse) {
    expect(res.send).toHaveBeenCalledWith(expectedResponse);
  }
};
