"use strict";

import { IException, IExceptionBase } from "./exceptions/Exception";

class ResponseFriendlyException implements IExceptionBase {
  message: string;
  statusCode: number;
  errorCode?: number;
  type: string;
  typeDescription: string;
  innerException?: any;
  constructor(exception: IException) {
    this.message = exception.message;
    this.statusCode = exception.statusCode;
    this.errorCode = exception.errorCode;
    this.type = exception.type;
    this.typeDescription = exception.typeDescription;
    this.innerException = getInnerException(exception.innerException);
  }
}

function getInnerException(innerException: any) {
  let responseFriendlyInnerError;
  if (!innerException) return responseFriendlyInnerError;
  if (innerException.isApplicationError) {
    responseFriendlyInnerError = new ResponseFriendlyException(innerException);
  } else {
    // Making a shallow copy to avoid deleting properties from original error.
    responseFriendlyInnerError = { ...innerException };
    delete responseFriendlyInnerError.stack;
    delete responseFriendlyInnerError.config;
  }
  return responseFriendlyInnerError;
}

export function getResponseFriendlyException(exception: IException) {
  return new ResponseFriendlyException(exception);
}
