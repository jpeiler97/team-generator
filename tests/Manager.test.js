const { it, expect, describe } = require("@jest/globals");
const Manager = require("../lib/manager");

describe("Manager class", () => {
  it("should take name as a parameter", () => {
    const testName = "John";
    const newManager = new Manager("John", 1, "john@john.com", 120);
    expect(newManager.name).toBe(testName);
  });
  it("should take officeNumber as a parameter", () => {
    const testNumber = 120;
    const newManager = new Manager("John", 1, "john@john.com", 120);
    expect(newManager.officeNumber).toBe(testNumber);
  });
  describe("getOfficeNumber", () => {
    it("should return the officeNumber parameter that has been passed in", () => {
      const testNumber = 120;
      const newManager = new Manager("John", 1, "john@john.com", 120);
      expect(newManager.getOfficeNumber()).toBe(testNumber);
    });
  });
  describe("getRole", () => {
    it("should return the role 'Manager'", () => {
      const testRole = "Manager";
      const newManager = new Manager("John", 1, "john@john.com", 120);
      expect(newManager.getRole()).toBe(testRole);
    });
  });
});
