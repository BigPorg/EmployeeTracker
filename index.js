// establish consts
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");

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
    select();
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
function addEmployee() {
    connection.query("SELECT * FROM employees", function (err, response) {
        if (err) throw err;
        inquirer
            .prompt([{
                name: "first",
                type: "input",
                message: "Employee's first name?",
            },
            {
                name: "last",
                type: "input",
                message: "Employee's last name?",
            },
            {
                name: "managerID",
                type: "input",
                message: "Employee's manager's ID?",
            },
            {
                name: "role_id",
                type: "input",
                message: "Employee's role ID?"
            },
            ])
            .then(function (answer) {
                let role_id;
                for (let i = 0; i < response.length; i++) {
                    if (response[i].title === answer.role) {
                        role_id = response[i].id;
                        console.log(role_id);
                    }
                }
            })
        connection.query("INSERT INTO employee SET ?", {
            first: answer.first,
            last: answer.last,
            managerID: answer.managerID,
            role_id: role_id,
        },
            function (err) {
                if (err) throw err;
                console.log("You have added an employee");
                select();
            }
        )

    })
}

// function addRole()
function addRole() {
    connection.query("SELECT * FROM role", function (err, response) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "newRole",
                    type: "input",
                    message: "What role would you like to add?",
                },
                {
                    name: "salary",
                    type: "input",
                    message: "What salary is being paid?",
                },
                {
                    name: "department",
                    type: "list",
                    choices: function () {

                    }
                }
            ])
            .then(function (answer) {
                let department_id;
                for (let i = 0; i < response.length; i++) {
                    if (response[i].title === answer.department) {
                        department_id = response[i].id;
                        console.log(department_id);
                    }
                }
            })
    })
}

// function updateEmployeeRole()
function updateEmployeeRole() {
    inquirer.prompt([{
        name: "first_name",
        tpye: "input",
        message: "Employee's first name"
    },
    {
        name: "last_name",
        type: "input",
        message: "Employee's last name?",
    },
    {
        name: "role_id",
        type: "input",
        message: "Employee's new role ID",
    }])
        .then(function (answer) {
            connection.query(
                "Update employee set where?", {
                role_id: answer.role_id,
            },
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                }
            )
            select();
        })
}

// function deleteEmployee() using .destroy?
function deleteEmployee() {
    inquirer.prompt({
        name: "role_id",
        type: "input",
        message: "ID of employee to remove",
    })
        .then(function (answer) {
            connection.query("Delete employee?", {
                role_id: answer.role_id,
            });
            select();
        })
}

// function exitApp()
function exitApp() {
    connection.end();
}