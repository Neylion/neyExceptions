"use strict";

import { Exception } from "./Exception";
import { InnerException } from "./Exception";

export class TimeoutException extends Exception {
  timeoutConfig: number;
  constructor(message: string, timeoutConfig: number, innerException: InnerException = {}) {
    super(message);

    this.name = "TimeoutException";
    this.timeoutConfig = timeoutConfig;
    this.statusCode = 500;
    this.type = "timeout";
    this.typeDescription = "A call to underlying system timed out.";

    delete this.location;
  }
}
