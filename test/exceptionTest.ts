"use strict";

import "mocha";
import { expect } from "chai";
import { Exception, ResourceException, ServiceContractException, getResponseFriendlyException } from "../src/index";
import { AssertionError } from "assert";

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

describe("responseFriendly errors looks like expected", () => {
  const propertiesThatShouldBeRemoved = [ "name", "isApplicationError", "location", "stack" ]
  const exception = new ServiceContractException("Invalid input on field XXX");
  // Check that exception contains the properties that should be removed
  propertiesThatShouldBeRemoved.forEach((property) => {
    expect(exception).to.have.property(property, exception[property], `Property '${property}' did not exist on error`);
  })

  const friendlyError = getResponseFriendlyException(exception);
  propertiesThatShouldBeRemoved.forEach((property) => {
    it(`Property '${property}' is removed`, () => {
      expect(friendlyError).to.not.have.property(property);
    })
  })
})

function expectInnerErrorsToMatch(actual: any, expected: any){
  const propertiesToCheck = [ "message", "name", "type" ]
  propertiesToCheck.forEach((property) => {
    expect(actual[property]).to.equal(expected[property], `Property '${property}' did not match`)
  })
}