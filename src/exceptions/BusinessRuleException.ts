"use strict";

import { Exception } from "./Exception";

export class BusinessRuleException extends Exception {
  constructor(message: string, errorCode: any, innerException?: any) {
    super(message, innerException);

    this.name = "BusinessRuleException";
    this.errorCode = errorCode ? Number(errorCode) : undefined;
    this.statusCode = 400;
    this.type = "businessRule";
    this.typeDescription = "Request conflicted with a business rule.";

    delete this.location;
  }
}
