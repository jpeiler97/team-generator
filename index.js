const fs = require("fs");
const inquirer = require("inquirer");
const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");

const employeeList = [];
let bodyHTML = ``;

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
              choices: ["Intern", "Engineer"],
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
                } else {
                  const empGithub = data.github;
                  const newEmployee = new Engineer(
                    empName,
                    empId,
                    empEmail,
                    empGithub
                  );
                  employeeList.push(newEmployee);
                }
                console.log(employeeList);

                startPrompts();
              });
          });
      } else {
        employeeList.forEach(writeHTMLCards);
        writeHTML();
      }
    });
}

console.log("Welcome to the Team Profile Generator!");
console.log("**************************************\n");
console.log("Please enter data for your team manager.\n");
initialPrompts();

const firstHTML = `
  <!DOCTYPE html>
    <html lang="en">
      <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
        crossorigin="anonymous"
      />
      <link rel="stylesheet" href="style.css" />
      <title>Team Profile Generator</title>
    </head>
    <body>
      <header>Team Profile</header>
      <div class="welcome-message">
        <h2>Welcome to our team!</h2>
      </div>
      <div class="profile-area container-fluid">
      <div class="row my-4 justify-content-center">`;

const lastHTML = `
    </div>
    </div>
  </div>
  </body>
</html>`;

function writeHTML() {
  fs.writeFile("./dist/index.html", firstHTML, (err) =>
    err ? console.error(err) : console.log("Added initial HTML.")
  );
  fs.appendFile("./dist/index.html", bodyHTML, (err) =>
    err ? console.error(err) : console.log("Added employee cards.")
  );
  fs.appendFile("./dist/index.html", lastHTML, (err) =>
    err
      ? console.error(err)
      : console.log(
          "HTML Document finished. Generated HTML with CSS Styling is located in the 'dist' directory."
        )
  );
}

function writeHTMLCards(employee, i, array) {
  if (i % 3 === 0 && i !== array.length) {
    bodyHTML += `</div>
      <div class="row my-4 justify-content-center">\n`;
  }

  if (employee.getRole() === "Manager") {
    bodyHTML += `
      <div class="col-3">
      <div class="card">
        <div class="card-header">Manager</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Name: ${employee.getName()}</li>
          <li class="list-group-item">ID #: ${employee.getId()}</li>
          <li class="list-group-item">Email: ${employee.getEmail()}</li>
          <li class="list-group-item">Office number: ${employee.getOfficeNumber()}</li>
        </ul>
      </div>
    </div>\n`;
  }

  if (employee.getRole() === "Intern") {
    bodyHTML += `
      <div class="col-3">
      <div class="card">
        <div class="card-header">Intern</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Name: ${employee.getName()}</li>
          <li class="list-group-item">ID #: ${employee.getId()}</li>
          <li class="list-group-item">Email: ${employee.getEmail()}</li>
          <li class="list-group-item">School: ${employee.getSchool()}</li>
        </ul>
      </div>
    </div>\n`;
  }
  if (employee.getRole() === "Engineer") {
    bodyHTML += `
      <div class="col-3">
      <div class="card">
        <div class="card-header">Engineer</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Name: ${employee.getName()}</li>
          <li class="list-group-item">ID #: ${employee.getId()}</li>
          <li class="list-group-item">Email: ${employee.getEmail()}</li>
          <li class="list-group-item">GitHub: ${employee.getGithub()}</li>
        </ul>
      </div>
    </div>\n`;
  }
}
