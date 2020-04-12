"use strict";

import { Exception } from "./Exception";

export class AssertionFailedException extends Exception {
  constructor(message: string, innerException?: any) {
    super(message, innerException);

    this.name = "AssertionFailedException";
    this.statusCode = 500;
    this.type = "assertionFailed";
    this.typeDescription =
      "Assertions failing means there is an internal problem. In case you see this issue as a client, please report it to the service team.";
  }
}
