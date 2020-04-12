"use strict";

import { Exception } from "./Exception";

export class TimeoutException extends Exception {
  timeoutConfig: number;
  constructor(message: string, timeoutConfig: number, innerException?: any) {
    super(message, innerException);

    this.name = "TimeoutException";
    this.timeoutConfig = timeoutConfig;
    this.statusCode = 500;
    this.type = "timeout";
    this.typeDescription = "A call to underlying system timed out.";

    delete this.location;
  }
}
