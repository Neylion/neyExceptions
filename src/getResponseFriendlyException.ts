"use strict";

import { IException, IExceptionBase } from "./exceptions/Exception";

class ResponseFriendlyException implements IExceptionBase {
  message: string;
  statusCode: number;
  errorCode?: number | undefined;
  type: string;
  typeDescription: string;
  innerException?: any;
  constructor(exception: IException) {
    this.message = exception.message;
    this.statusCode = exception.statusCode;
    this.errorCode = exception.errorCode;
    this.type = exception.type;
    this.typeDescription = exception.typeDescription;
    this.innerException = exception.innerException;
  }
}

export function getResponseFriendlyException(exception: IException) {
  return new ResponseFriendlyException(exception);
}
