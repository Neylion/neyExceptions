"use strict";

import { Exception } from "./Exception";
import { InnerException } from "./Exception";

export class ServiceContractException extends Exception {
  constructor(message: string, innerException: InnerException = {}) {
    super(message, innerException);

    this.name = "ServiceContractException";
    this.statusCode = 400;
    this.type = "serviceContract";
    this.typeDescription = "Request data is faulty in one way or the other.";
  }
}
