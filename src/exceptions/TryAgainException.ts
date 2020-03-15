"use strict";

import { Exception } from "./Exception";
import { InnerException } from "./Exception";

export class TryAgainException extends Exception {
  constructor(message: string, innerException: InnerException = {}) {
    super(message, innerException);

    this.name = "TryAgainException";
    this.statusCode = 500;
    this.type = "tryAgain";
    this.typeDescription = "A dependency is currently unavailable, please try again later.";
  }
}
