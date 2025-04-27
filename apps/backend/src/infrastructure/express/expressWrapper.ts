import express, { Application } from 'express';

export class ExpressWrapper {
  public static create(): Application {
    return express();
  }

  public static createNull(): Application {
    // Later we will implement Nullable Express Stub
    return express();
  }
}
