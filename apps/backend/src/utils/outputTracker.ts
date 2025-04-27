// apps/backend/src/utils/outputTracker.ts

import { EventEmitter } from 'events';

export class OutputTracker<T> {
  private readonly output: T[] = [];

  constructor(
    private readonly emitter: EventEmitter,
    private readonly eventName: string,
  ) {
    this.emitter.on(this.eventName, (data: T) => {
      this.output.push(data);
    });
  }

  public get data(): T[] {
    return [...this.output];
  }

  public clear(): T[] {
    const data = [...this.output];
    this.output.length = 0;
    return data;
  }

  public stop(): void {
    this.emitter.removeAllListeners(this.eventName);
  }
}
