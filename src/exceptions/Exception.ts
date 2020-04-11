"use strict";

import StackUtils from "stack-utils"
const stackTrace = new StackUtils({cwd: process.cwd(), internals: StackUtils.nodeInternals()})

export interface InnerException {
  config?: any;
  stack?: any;
  isApplicationError?: boolean;
  location?: string[];
  [x: string]: any;
}

export class Exception extends Error {
  name: string = "Exception";
  message: string;
  statusCode: number = 500;
  errorCode?: number;
  type: string = "unknown";
  typeDescription: string = "Generic exception without specified type.";
  isApplicationError: boolean = true;
  innerException?: InnerException;
  location: string[];
  constructor(message: string, innerException: InnerException = {}, trace = null) {
    super();

    this.message = message;
    this.location = trace || this.stack ? getCallerHistory(this.stack) : [ "Could not find error stack trace!" ];
    this.innerException = cloneInnerException(innerException);;
  }
}

function getCallerHistory(stack: any, limit = 5, callsToIgnore = 0){
  const errorStack = stackTrace.clean(stack)
  const callSites = errorStack.split("\n");
  const errorTrace: string[] = [];
  for(let i = callsToIgnore; i < limit+callsToIgnore;i++){
    errorTrace.push(callSites[i]);
  }
  errorTrace.push("For a more detailed stack trace check error stack trace");
  return errorTrace;
}

function cloneInnerException(innerException: any){
  let clonedInnerException;
  if (typeof innerException !== "undefined" && innerException !== null) {
    delete innerException.config;
    delete innerException.stack;
    delete innerException.isApplicationError;

    clonedInnerException = {};
    Object.assign(clonedInnerException, innerException);
  }
  return clonedInnerException;
}
