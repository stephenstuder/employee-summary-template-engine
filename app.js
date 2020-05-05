const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const managerQuestions = [{
    type: "input",
    name: "name",
    message: "Please enter the name of the manager"
},
{
    type: "input",
    name: "id",
    message: "Please enter the manager's id"
},
{
    type: "input",
    name: "email",
    message: "Please enter the manager's email address"
},
{
    type: "input",
    name: "roomNumber",
    message: "Please enter the room number of this manager"
}
];

const engineerQuestions = [{
    type: "input",
    name: "name",
    message: "Please enter the name of the engineer",
},
{
    type: "input",
    name: "id",
    message: "Please enter the engineer's id",
},
{
    type: "input",
    name: "email",
    message: "Please enter the engineer's email address",
},
{
    type: "input",
    name: "github",
    message: "Please enter the engineer's github url",
}
];

const internQuestions = [{
    type: "input",
    name: "name",
    message: "Please enter the name of the intern",
},
{
    type: "input",
    name: "id",
    message: "Please enter the intern's id",
},
{
    type: "input",
    name: "email",
    message: "Please enter the intern's email address",
},
{
    type: "input",
    name: "school",
    message: "Please enter the school of this intern",
}
];

const chooseEmployeeType = [{
    type: "list",
    name: "type",
    message: "What type of employee would you like to Input",
    choices: [
        "Manager",
        "Engineer",
        "Intern",
        "Exit Employee Input"
    ],
}];

function createManager(employeeData) {
    let employeeIdentifier = employeeData.id;
    return employeeIdentifier = new Manager(employeeData.name, employeeData.id, employeeData.email, employeeData.roomNumber);
}
function createEngineer(employeeData) {
    let employeeIdentifier = employeeData.id;
    return employeeIdentifier = new Engineer(employeeData.name, employeeData.id, employeeData.email, employeeData.github);
}
function createIntern(employeeData) {
    let employeeIdentifier = employeeData.id;
    return employeeIdentifier = new Intern(employeeData.name, employeeData.id, employeeData.email, employeeData.school);
}

const employeeArray = [];

async function main() {
    let employeeType = await inquirer.prompt(chooseEmployeeType);
    let employee;
    while (employeeType != "Exit Employee Input") {
        if (employeeType.type === "Manager") {
            employee = await inquirer.prompt(managerQuestions);
            employeeArray.push(createManager(employee));
            employeeType = await inquirer.prompt(chooseEmployeeType);
        } else if (employeeType.type === "Engineer") {
            employee = await inquirer.prompt(engineerQuestions);
            employeeArray.push(createEngineer(employee));
            employeeType = await inquirer.prompt(chooseEmployeeType);
        } else if (employeeType.type === "Intern") {
            employee = await inquirer.prompt(internQuestions);
            employeeArray.push(createIntern(employee));
            employeeType = await inquirer.prompt(chooseEmployeeType);
        } else if (employeeType.type = "Exit Employee Input") {
            const html = render(employeeArray);
            fs.writeFile("team.html", html, (err) => err ? console.log(err) : console.log("Success!"));
            return;
        }
    }
}

main();
