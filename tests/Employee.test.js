const Employee = require("./lib/Employee");

describe("Employee class", () => {
  it("should take an employee name as a parameter", () => {
    const testName = "John";
    expect(new Employee("John", 1, "john@john.com").name).toBe(testName);
  });

  describe("getName", () => {
    it("should return the name passed in as a parameter", () => {
      const testName = "John";
      const newEmployee = new Employee("John", 1, "john@john.com");
      expect(newEmployee.getName().toBe(testName));
    });
  });
  describe("getId", () => {
    it("should return the id passed in as parameter", () => {
      const testId = "1";
      const newEmployee = new Employee("John", 1, "john@john.com");
      expect(newEmployee.getId().toBe(testId));
    });
  });
  describe("getEmail", () => {
    it("should return the Email passed in as a parameter", () => {
      const testEmail = "john@john.com";
      const newEmployee = new Employee("John", 1, "john@john.com");
      expect(newEmployee.getEmail().toBe(testEmail));
    });
  });
  describe("getRole", () => {
    it("should return the role 'Employee'", () => {
      const newEmployee = new Employee("John", 1, "john@john.com");
      expect(newEmployee.getRole().toBe("Employee"));
    });
  });
});
