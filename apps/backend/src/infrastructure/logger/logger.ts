export class Logger {
  public static info(...args: unknown[]): void {
    console.log('[INFO]', ...args);
  }

  public static error(...args: unknown[]): void {
    console.error('[ERROR]', ...args);
  }
}
