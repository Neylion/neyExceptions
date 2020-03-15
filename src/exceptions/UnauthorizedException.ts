"use strict";

import { Exception } from "./Exception";

export class UnauthorizedException extends Exception {
  constructor() {
    super("Missing or invalid authorization.");

    this.name = "UnauthorizedException";
    this.statusCode = 401;
    this.type = "unauthorized";
    this.typeDescription = "Request had invalid, insufficient or missing authorization.";

    delete this.location;
  }
}
