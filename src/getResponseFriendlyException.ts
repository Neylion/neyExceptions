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
    if(exception.innerException && exception.innerException.isApplicationError){
        this.innerException = new ResponseFriendlyException(exception.innerException);
    } else {
        this.innerException = exception.innerException;
        delete this.innerException.stack;
        delete this.innerException.config;
    }
  }
}

export function getResponseFriendlyException(exception: IException) {
  return new ResponseFriendlyException(exception);
}
