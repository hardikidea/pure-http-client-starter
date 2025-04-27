import { EventEmitter } from 'events';
import Transport from 'winston-transport';
import { TransformableInfo } from 'logform';
import { OutputTracker } from '../utils/outputTracker';

const emitter = new EventEmitter();

// This no-op listener is needed when no listener is configured
emitter.on('error', () => {});

export class EmittingTransport extends Transport {
  log(info: TransformableInfo, callback: () => void): void {
    emitter.emit(info.level, info.message);
    callback();
  }
}

export function loggerEmitter(): OutputTracker<string> {
  return new OutputTracker<string>(emitter, 'error');
}
