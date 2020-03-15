"use strict";

import { Exception } from "./Exception";
import { InnerException } from "./Exception";

export class ResourceException extends Exception {
  constructor(message: string, innerException: InnerException = {}) {
    super(message, innerException);

    this.name = "ResourceException";
    this.statusCode = 500;
    this.type = "resource";
    this.typeDescription = "A request to an external resource returned an error or unexpected data.";
  }
}
