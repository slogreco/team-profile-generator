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

function addEmployee() {
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
            if (answer.role === "Engineer") {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "github",
                        message: "Please enter employee's GitHub Username",
                    }
                ])
                    .then(function (res) {
                        const engineer = new Engineer(answer.name, answer.id, answer.email, res.github);
                        employees.push(engineer);
                        writeEmployee();

                    })
            }
            else if (answer.role === "Intern") {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "school",
                        message: "Please enter employee's school",
                    }
                ])
                    .then(function (res) {
                        const intern = new Intern(answer.name, answer.id, answer.email, res.school);
                        employees.push(intern);
                        writeEmployee();

                    })
            }
            else if (answer.role === "Manager") {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "officeNumber",
                        message: "Please enter employee's office number",
                    }
                ])
                    .then(function (res) {
                        const manager = new Manager(answer.name, answer.id, answer.email, res.officeNumber);
                        employees.push(manager);
                        writeEmployee();
                    })
            }
        })
    function writeEmployee() {
        inquirer.prompt([
            {
                type: "confirm",
                name: "more",
                message: "Would you like to add an additional employee?",
                default: "true"
            }
        ]).then(function (res) {
            if (res.more) {
                addEmployee();
            } else {
                const employeeData = render(employees)
                fs.writeFile(outputPath, employeeData, function (err) {
                    if (err) throw err;
                    console.log("New employee(s) added")
                });
            };
        });
    };
};


addEmployee();

