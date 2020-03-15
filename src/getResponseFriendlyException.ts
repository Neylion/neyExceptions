"use strict";

import { Exception } from "./exceptions/Exception";

export function getResponseFriendlyException(exception: Exception) {
  const friendlyError = {
    ...exception,
  };

  delete friendlyError.name;
  delete friendlyError.isApplicationError;
  return friendlyError;
}
