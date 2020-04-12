"use strict";

import { Exception } from "./Exception";

export class ServiceContractException extends Exception {
  name: string;
  constructor(message: string, innerException?: any) {
    super(message, innerException);

    this.name = "ServiceContractException";
    this.statusCode = 400;
    this.type = "serviceContract";
    this.typeDescription = "Request data is faulty in one way or the other.";
  }
}
