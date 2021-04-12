const fs = require("fs");
const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "list",
      name: "prompt",
      message: "Do you want to add a new employee?",
      choices: ["yes", "no"],
    },
  ])
  .then((data) => {
    if (data.prompt === "yes") {
      inquirer
        .prompt([
          {
            type: "list",
            name: "role",
            message: "What is your employees role?",
            choices: ["Employee", "Manager", "Intern", "Engineer"],
          },
        ])
        .then((data) => {
          let employeeRole = data.role;
          initialPrompts(employeeRole);
        });
    }
  });

function initialPrompts(role) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your employees name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is your employee's ID number?",
      },
      {
        type: "input",
        name: "email",
        message: "What is your employee's Email?",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is your employee's office number?",
        when: role === "Manager",
      },
      {
        type: "input",
        name: "school",
        message: "What is your employee's school name?",
        when: role === "Intern",
      },
      {
        type: "input",
        name: "github",
        message: "What is your employee's github account?",
        when: role === "Engineer",
      },
    ])
    .then((data) => {
      if (role === "Manager") {
      }
    });
}
