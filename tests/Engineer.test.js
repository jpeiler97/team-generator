const { describe, it, expect } = require("@jest/globals");
const Engineer = require("../lib/engineer");

describe("Engineer class", () => {
  it("should take name as a parameter", () => {
    const testName = "John";
    const newEngineer = new Engineer("John", 1, "john@john.com", "john123");
    expect(newEngineer.name).toBe(testName);
  });
  it("should take github as a parameter", () => {
    const testAccount = "john123";
    const newEngineer = new Engineer("John", 1, "john@john.com", "john123");
    expect(newEngineer.github).toBe(testAccount);
  });
  describe("getGithub", () => {
    it("should return the github parameter that has been passed in", () => {
      const testAccount = "john123";
      const newEngineer = new Engineer("John", 1, "john@john.com", "john123");
      expect(newEngineer.getGithub()).toBe(testAccount);
    });
  });
  describe("getRole", () => {
    it("should return the role 'Engineer'", () => {
      const newEngineer = new Engineer("John", 1, "john@john.com", "john123");
      expect(newEngineer.getRole()).toBe("Engineer");
    });
  });
});
