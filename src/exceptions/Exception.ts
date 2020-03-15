"use strict";

import { get as getStackTrace } from "stack-trace";
import cloneDeep from "lodash.clonedeep";

function getCallerHistory(callsToIgnore = 3) {
  const trace = getStackTrace();

  const fileNames: string[] = [];
  const errorLocation = [];
  for (let i = callsToIgnore; i < trace.length; i++) {
    const fileName = trace[i].getFileName();
    if (!fileNames.includes(fileName) && fileName !== null /* && !fileName.includes("node_modules")*/) {
      fileNames.push(fileName);
      errorLocation.push(`${fileName}:${trace[i].getLineNumber()}`);
    }
    if (errorLocation.length >= 3) {
      break;
    }
  }
  errorLocation.push("For a more detailed stack trace check logs.");
  return errorLocation;
}

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
  innerException: InnerException;
  location: string[];
  constructor(message: string, innerException: InnerException = {}, trace = null) {
    super();

    this.message = message;
    this.innerException = {};
    if (typeof innerException !== "undefined" && innerException !== null && innerException.message !== message) {
      delete innerException.config;
      delete innerException.stack;
      delete innerException.isApplicationError;
      delete innerException.location;
      this.innerException = cloneDeep(innerException);
      // Clone deep can not handle TypeError messages for whatever reason, hence below:
      if (innerException.message) {
        this.innerException.message = innerException.message;
      }
    }
    this.location = trace || getCallerHistory();
  }
}
