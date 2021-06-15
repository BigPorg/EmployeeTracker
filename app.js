// establish consts
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
const { exit } = require("process");
const { throwError } = require("rxjs");
// establish connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Ewoksrule17!",
    database: "employees_db"
});
// don't need to {else} if only one thing like this
connection.connect(function (err) {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`)
    selection();
});

// selection for users 
function select() {
    inquirer
        .prompt({
            name: "selections",
            type: "list",
            message: "Please select an action for the Employee Database.",
            choices: [
                "View Departments",
                "View Employees",
                "View Roles",
                "Add a department",
                "Add an employee",
                "Add a role",
                "Update an employee's role",
                "Delete an employee",
                "Exit",
                // bonuses to view employee by manager, update employee managers, delete departments, roles and employees, and view total budget
            ],
        })
        // switch case for user answers
        .then(function (userAnswer) {
            switch (userAnswer.selections) {
                case "View Departments":
                    viewDepartments();
                    break;

                case "View Employees":
                    viewEmployees();
                    break;

                case "View Roles":
                    viewRoles();
                    break;

                case "Add a department":
                    addDepartment();
                    break;

                case "Add an employee":
                    addEmployee();
                    break;

                case "Add a role":
                    addRole();
                    break;

                case "Update an employee's role":
                    updateEmployeeRole();
                    break;

                case "Delete an employee":
                    deleteEmployee();
                    break;

                case "Exit":
                    exitApp();
                    break;
                // add bonus rounds here
                default:
                    break;
            }

        });
}

// functions for queries to follow this formula
// 
// function functionName() {
// let query = "SELECT * FROM relevent thing"
// connection.query(query, function (err, response) {
// if (err) throw err;
// console.table("Relevent thing", response);
// select();
// });
// }

// function viewDepartments()
function viewDepartments() {
    let query = "SELECT * FROM departments";
    connection.query(query, function (err, response) {
        if (err) throw err;
        console.table("All departments: ", response);
        select();
    });
}

// function viewEmployees()
function viewEmployees() {
    let query = "SELECT * FROM employees";
    connection.query(query, function (err, response) {
        if (err) throw err;
        console.table("All employees: ", response)
        select();
    });
}

// function viewRoles()
function viewRoles() {
    let query = "SELECT * FROM roles";
    connection.query(query, function (err, response) {
        if (err) throw err;
        console.table("All roles: ", response)
        select();
    });
}

// function addDepartment()
function addDepartment() {
    inquirer
        .prompt([
            {
                name: "newDepartment",
                type: "input",
                message: "Type a department you'd like to add.",
            },
        ])
        .then(function (answer) {
            connection.query("INSERT INTO departments SET ?", {
                name: answer.newDepartment,
            })
            let query = "SELECT * FROM department";
            connection.query(query, function (err, response) {
                if (err) throw err;
                console.table("All departments: ", response);
                console.log("Department added.")
                select();
            });
        });
}

// function addEmployee()

// function addRole()

// function updateEmployeeRole()

// function deleteEmployee()

// function exitApp()
function exitApp() {
    connection.end();
}