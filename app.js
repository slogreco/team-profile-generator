const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { allowedNodeEnvironmentFlags } = require("process");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employees = [];

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

function newEmployee() {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Choose Employees Role",
            choices: ["Engineer", "Intern", "Manager"]
        },
        {
            type: "input",
            name: "name",
            message: "Please enter employees name"
        },
        {
            type: "input",
            name: "id",
            message: "Please enter employees ID"
        },
        {
            type: "input",
            name: "email",
            message: "Please enter employees email"
        }
    ])
    .then(function (answer) {
        if(answer.role === "Engineer") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "github",
                    message: "Please enter employee's GitHub Username",
                }
            ])
            .then(function(res) {
                const engineer = new Engineer(answer.name, answer.id, answer.email, res.github);
                employees.push(engineer);
            })
        }
        else if(answer.role === "Intern") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "school",
                    message: "Please enter employee's school",
                }
            ])
            .then(function(res) {
                const intern = new Intern(answer.name, answer.id, answer.email, res.school);
                employees.push(intern);
            })
        }
        else if(answer.role === "Manager") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "officeNumber",
                    message: "Please enter employee's office number",
                }
            ])
            .then(function(res) {
                const manager = new Manager(answer.name, answer.id, answer.email, res.officeNumber);
                employees.push(manager);
            })
        }
    })
}

newEmployee();

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
