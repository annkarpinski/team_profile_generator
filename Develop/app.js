const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const createTeam = () => {
  console.log("Please build your team.");
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is you manager's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your manager's ID number?",
        name: "id",
      },
      {
        type: "input",
        message: "What is your manager's email address?",
        name: "email",
      },
      {
        type: "input",
        message: "What is your manager's office number?",
        name: "officeNumber",
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      employees.push(manager);
      addTeamMember();
    })
    .catch((err) => {
      console.log(err);
    });

  const addTeamMember = () =>
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which type of team member do you want to add?",
          name: "addNew",
          choices: ["Engineer", "Intern", "I am done adding team members"],
        },
      ])
      .then((answers) => {
        if (answers.addNew === "Intern") {
          addIntern();
        } else if (answers.addNew === "Engineer") {
          addEngineer();
        } else if (answers.add === "I am done adding team members") {
          render(employees);
        }
      });

  const addEngineer = () =>
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the engineer's name?",
          name: "name",
        },
        {
          type: "input",
          message: "What is the engineer's ID number?",
          name: "id",
        },
        {
          type: "input",
          message: "What is the engineer's email address?",
          name: "email",
        },
        {
          type: "input",
          message: "What is the engineer's GitHub username?",
          name: "github",
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.name,
          answers.id,
          answers.email,
          answers.github
        );
        employees.push(engineer);
        addTeamMember();
        console.log(engineer);
      })
      .catch((err) => {
        console.log(err);
      });

  const addIntern = () =>
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the intern's name?",
          name: "name",
        },
        {
          type: "input",
          message: "What is the intern's ID number?",
          name: "id",
        },
        {
          type: "input",
          message: "What is the intern's email address?",
          name: "email",
        },
        {
          type: "input",
          message: "What is the intern's school?",
          name: "school",
        },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.name,
          answers.id,
          answers.email,
          answers.school
        );
        employees.push(intern);
        addTeamMember();
        console.log(intern);
      })
      .catch((err) => {
        console.log(err);
      });
};

// .then(function (data) {
//   console.log(data);

//   fs.writeFile("./output/team.html", render(data), function (err) {
//     if (err) throw err;
//     console.log("success!");
//   });
// });

createTeam();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
