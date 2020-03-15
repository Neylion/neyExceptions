"use strict";

import { Exception } from "./Exception";
import { InnerException } from "./Exception";

export class BusinessRuleException extends Exception {
  constructor(message: string, errorCode: any, innerException: InnerException = {}) {
    super(message, innerException);

    this.name = "BusinessRuleException";
    this.errorCode = errorCode ? Number(errorCode) : undefined;
    this.statusCode = 400;
    this.type = "businessRule";
    this.typeDescription = "Request conflicted with a business rule.";

    delete this.location;
  }
}
