"use strict";

import { Exception } from "./Exception";

export class FaultyConfigException extends Exception {
  constructor(message: string, innerException?: any) {
    super(message, innerException);

    this.name = "FaultyConfigException";
    this.statusCode = 500;
    this.type = "config";
    this.typeDescription = "Unexpected or faulty config setup.";
  }
}
