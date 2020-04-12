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

describe("getResponseFriendlyException tests", () => {
  const propertiesThatShouldBeRemoved = [ "name", "isApplicationError", "location", "stack" ]
  const innerUnknownException = new Error("Inner unknown error");
  const innerNativeException = new Exception("Inner native error", innerUnknownException);
  const exception = new ServiceContractException("Invalid input on field XXX", innerNativeException);

  let friendlyError = getResponseFriendlyException(exception);
  describe("Upper error looks like expected", () => {
    propertiesThatShouldBeRemoved.forEach((property) => {
      // Check that exception contains the properties that should be removed
      expect(exception).to.have.property(property, exception[property], `Property '${property}' did not exist on innerException`);
      
      it(`Property '${property}' is removed`, () => {
        expect(friendlyError).to.not.have.property(property);
      })
    })
  });
  describe("[isApplicationError = true] (native) inner error looks like expected", () => {
    propertiesThatShouldBeRemoved.forEach((property) => {
      // Check that exception contains the properties that should be removed
      expect(innerNativeException).to.have.property(property, innerNativeException[property], `Property '${property}' did not exist on innerException`);
      
      it(`Property '${property}' is removed`, () => {
        expect(friendlyError.innerException).to.not.have.property(property);
      })
    })
  });
  describe("[isApplicationError = false] (Unknown) inner error looks like expected", () => {
    // Hard to test since it's dynamic, testing this specific case for "message" property
    it("Property 'message' match original error", () => {
      expect(friendlyError.innerException.innerException).to.have.property("message", innerUnknownException.message);
    })
  });

  it("If inner no inner error was passed, inner error should be undefined", () => {
    const exception = new Exception("Exception without innerException");
    expect(exception.innerException).to.be.undefined;
    const responseFriendlyException = getResponseFriendlyException(exception);
    expect(responseFriendlyException.innerException).to.be.undefined;
  })
})

function expectInnerErrorsToMatch(actual: any, expected: any){
  const propertiesToCheck = [ "message", "name", "type" ]
  propertiesToCheck.forEach((property) => {
    expect(actual[property]).to.equal(expected[property], `Property '${property}' did not match`)
  })
}