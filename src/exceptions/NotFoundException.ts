"use strict";

import { Exception } from "./Exception";
import { InnerException } from "./Exception";

export class NotFoundException extends Exception {
  constructor(message: string, errorCode = null, innerException: InnerException = {}) {
    super(message, innerException);

    this.name = "NotFoundException";
    this.statusCode = 404;
    this.errorCode = errorCode ? Number(errorCode) : undefined;
    this.type = "notFound";
    this.typeDescription = "An entity that was expected to be found was not.";

    delete this.location;
  }
}
