//Imports
const fs = require("fs");
const inquirer = require("inquirer");
const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");

//Declaring empty array to push new employees
const employeeList = [];

//Declaring string template literal to add HTML depending on results of prompts
let bodyHTML = ``;

//Function to initialize prompts (starting with info about the manager)
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
      //Defines new Manager() using input given by user.
      const empName = data.name;
      const empId = data.id;
      const empEmail = data.email;
      const empOfficeNumber = data.officeNumber;
      const newManager = new Manager(empName, empId, empEmail, empOfficeNumber);

      //Adds newManager to employeeList array
      employeeList.push(newManager);
      startPrompts();
    });
}

//Starts series prompts that ask for 'intern' or 'engineer'
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
      //Starts prompts if user selects 'Yes'
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
            //Declaring role chosen in previous prompt in order to display the correct final prompt
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
                //Defines either new Intern() or Engineer() object depending on the role chosen in the prompts
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
                //Restarts intern/engineer prompts once newEmployee has been pushed to employeeList
                startPrompts();
              });
          });
      } else {
        //If the user chooses 'No' when asked if they want to add a new employee, then the prompts will end
        //and the HTML document will be created, based on each employee's information
        employeeList.forEach(writeHTMLCards);
        writeHTML();
      }
    });
}

//HTML to be written to file before dynamically generated HMTL
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

//HTML to be written to file after dynamically generated HTML
const lastHTML = `
    </div>
    </div>
  </div>
  </body>
</html>`;

//Function to create an HTML file using firstHTML, bodyHTML, and lastHTML.
function writeHTML() {
  fs.writeFile("./dist/index.html", firstHTML + bodyHTML + lastHTML, (err) =>
    err ? console.error(err) : console.log("Added HTML file.")
  );
}

//Callback function that writes HMTL displaying a card for each employee's info
function writeHTMLCards(employee, i, array) {
  if (i % 3 === 0 && i !== array.length) {
    bodyHTML += `</div>
      <div class="row my-4 justify-content-center">\n`;
  }

  //Different HTML based on the role of the employee
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

//Initialization
console.log("Welcome to the Team Profile Generator!");
console.log("**************************************\n");
console.log("Please enter data for your team manager.\n");
initialPrompts();
