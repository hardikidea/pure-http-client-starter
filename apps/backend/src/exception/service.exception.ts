export default class ServiceException extends Error {
  public readonly code: string;
  public readonly msg: string;

  constructor(msg: string, code = 'GENERAL') {
    super(msg);

    this.code = code;
    this.msg = msg;

    Error.captureStackTrace(this);
  }
}
