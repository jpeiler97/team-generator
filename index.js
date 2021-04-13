const fs = require("fs");
const inquirer = require("inquirer");
const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");

const employeeList = [];

function initialPrompts() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is their name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is their ID number?",
      },
      {
        type: "input",
        name: "email",
        message: "What is their Email?",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is their office number?",
      },
    ])
    .then((data) => {
      const empName = data.name;
      const empId = data.id;
      const empEmail = data.email;
      const empOfficeNumber = data.officeNumber;
      const newManager = new Manager(empName, empId, empEmail, empOfficeNumber);
      employeeList.push(newManager);
      startPrompts();
    });
}

function startPrompts() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "prompt",
        message: "Would you like to add a new employee?",
        choices: ["Yes", "No"],
      },
    ])
    .then((data) => {
      if (data.prompt === "Yes") {
        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "What is your employees role?",
              choices: ["Employee", "Intern", "Engineer"],
            },
          ])
          .then((data) => {
            let role = data.role;
            inquirer
              .prompt([
                {
                  type: "input",
                  name: "name",
                  message: "What is their name?",
                },
                {
                  type: "input",
                  name: "id",
                  message: "What is their ID number?",
                },
                {
                  type: "input",
                  name: "email",
                  message: "What is their Email?",
                },
                {
                  type: "input",
                  name: "school",
                  message: "What is their school name?",
                  when: role === "Intern",
                },
                {
                  type: "input",
                  name: "github",
                  message: "What is their github account?",
                  when: role === "Engineer",
                },
              ])
              .then((data) => {
                let empName = data.name;
                let empId = data.id;
                let empEmail = data.email;

                if (role === "Intern") {
                  const empSchool = data.school;
                  const newEmployee = new Intern(
                    empName,
                    empId,
                    empEmail,
                    empSchool
                  );
                  employeeList.push(newEmployee);
                } else if (role === "Engineer") {
                  const empGithub = data.github;
                  const newEmployee = new Engineer(
                    empName,
                    empId,
                    empEmail,
                    empGithub
                  );
                  employeeList.push(newEmployee);
                } else {
                  const newEmployee = new Employee(empName, empId, empEmail);
                  employeeList.push(newEmployee);
                }
                console.log(employeeList);
                startPrompts();
              });
          });
      } else {
        return;
      }
    });
}

console.log("Welcome to the Team Profile Generator!");
console.log("**************************************\n");
console.log("Please enter data for your team manager.\n");
initialPrompts();
