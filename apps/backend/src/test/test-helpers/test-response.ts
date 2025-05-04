import { Response } from 'express';
import { vi } from 'vitest';

export const buildTestResponse = (opts?: { clientId: string }): Response => {
  const res = {
    send: vi.fn(),
    status: vi.fn().mockReturnThis(),
    header: vi.fn(),
    writeHead: vi.fn(),
    write: vi.fn(),
    locals: opts?.clientId ? { jwt: { claims: { cid: opts.clientId } } } : {},
  } as unknown as Response;
  return res;
};
