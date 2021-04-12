const { it } = require("@jest/globals");
const { describe } = require("yargs");
const Employee = require("./lib/Employee");

describe("Employee class", () => {
  it("should take an employee name as a parameter", () => {
    const testName = "John";
    expect(new Employee("John", 1, "john@john.com").name).toBe(testName);
  });

  describe("getName", () => {});
  describe("getId", () => {});
  describe("getEmail", () => {});
  describe("getRole", () => {});
});
