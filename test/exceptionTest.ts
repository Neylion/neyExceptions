"use strict";

import "mocha";
import { expect } from "chai";
import { Exception, ResourceException, ServiceContractException } from "../src/index";

describe("Exception tests", () => {
  it("innerException is added properly", () => {
    const innerException = new Exception("Fake inner error");
    const exception = new ResourceException("Fake error", innerException);
    expectInnerErrorsToMatch(exception.innerException, innerException);

    const upperException = new ResourceException("Fake error", exception);
    expectInnerErrorsToMatch(upperException.innerException, exception);
    expectInnerErrorsToMatch(upperException.innerException?.innerException, innerException);
  });
})

function expectInnerErrorsToMatch(actual: any, expected: any){
  const propertiesToCheck = [ "message", "name", "type" ]
  propertiesToCheck.forEach((property) => {
    expect(actual[property]).to.equal(expected[property], `Property '${property}' did not match`)
  })
}