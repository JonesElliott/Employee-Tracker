const mysql = require("mysql");
const connection = require("./db/connection");
const cTable = require('console.table');
const inquirer = require("inquirer");
var Employee = require('./scripts/employee');
const { connect, query } = require("./db/connection");

var newEmployee = new Employee();

// Initiate connection to MySQL server
connection.connect(function(error) {
    if (error) throw error;
    console.log("Connected as id " + connection.threadId + "\n\n");
    console.log(`
#=================================================================#
|                       Employee Manager                          |
|                Micro-Management at it's finest                  |
#=================================================================#
        `);
    mainMenu();
});

// Function to display the main mneu
function mainMenu() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "\n\nMain Menu\nPlease select from the following options",
          choices: [
            "View All Employees",
            "View Employees by Department",
            "View Employees by Manager",
            "Add New Employee",
            "Add New Department",
            "Add New Role",
            "Update Employee's Role",
            "Update Emplyee's Manager"
          ],
          name: "selection",
        },
      ])
      .then(function ({ selection }) {
        switch (selection) {
          case "View All Employees":
            queryAllEmployees();
            break;
          case "View Employees by Department":
            queryAllByDepartment();
            break;
          case "View Employees by Manager":
            queryAllByManager();
            break;
          case "Add New Employee":
            addEmployee();
            break;
          case "Add New Department":
            addDepartment();
            break;
          case "Add New Role":
            addRole();
            break;
          case "Update Employee's Role":
            updateEmployeeRole();
            break;
          case "Update Employee's Manager":
            updateEmployeeManager();
            break;
          default:
            "Hmmm, that's not supposed to happen...";
        }
      });
}


// Functions that Query the database
//----------------------------------------------------------------
function queryAllEmployees() {
    connection.query(
        `SELECT
        employee.id AS "ID",
          employee.first_name AS "First",
          employee.last_name AS "Last",
          role.title AS "Title",
          department.name AS "Department",
          role.salary AS "Salary",
          CONCAT(manager.first_name,' ', manager.last_name) AS "Manager"
        FROM
          employee
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        ORDER BY employee.first_name;`,
        function(error, response) {
            if (error) throw error;
            console.log(`
#=================================================================#
                  All Employees Sorted A - Z
#=================================================================#
            \n`);
            console.table(response);
            mainMenu();
        });
}

function queryAllByDepartment() {
    connection.query(
        `SELECT
        employee.id AS "ID",
          employee.first_name AS "First",
          employee.last_name AS "Last",
          role.title AS "Title",
          department.name AS "Department",
          role.salary AS "Salary",
          CONCAT(manager.first_name,' ', manager.last_name) AS "Manager"
        FROM
          employee
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        ORDER BY department.id;`,
        function(error, response) {
            if (error) throw error;
            console.log(`
#=================================================================#
                All Employees Sorted by Department
#=================================================================#
            \n`);
            console.table(response);
            mainMenu();
        });
}

function queryAllByManager() {
    connection.query(
        `SELECT
        employee.id AS "ID",
          employee.first_name AS "First",
          employee.last_name AS "Last",
          role.title AS "Title",
          department.name AS "Department",
          role.salary AS "Salary",
          CONCAT(manager.first_name,' ', manager.last_name) AS "Manager"
        FROM
          employee
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        ORDER BY manager;`,
        function(error, response) {
            if (error) throw error;
            console.log(`
#=================================================================#
                All Employees Sorted by Manager
#=================================================================#
            \n`);
            console.table(response);
            mainMenu();
        });
}
// ----------------------------------------------------------------

// Get New Employee and INSERT to database
function addEmployee() {
  connection
    .query("SELECT role.id, role.title FROM role", (err, res) => {
      if (err) {
        throw err;
      }
      const roles = res.map((row) => {
        return {
          name: row.title,
          value: row.id,
        };
      });
      connection.query(
        "SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS manager, employee.id FROM employee",
        (err, res) => {
          if (err) {
            throw err;
          }
          const managers = res.map((element) => {
            return {
              name: element.manager,
              value: element.id,
            };
          });
          inquirer
            .prompt([
              {
                type: "input",
                name: "first",
                message: "What is the employees first name",
              },
              {
                type: "input",
                name: "last",
                message: "What is the employees last name",
              },
              {
                type: "list",
                name: "roleSelect",
                message: "What is their role?",
                choices: roles,
              },
              {
                type: "list",
                name: "mangerSelect",
                message: "Who is their Manager?",
                choices: managers,
              },
            ])
            .then((answers) => {
              connection.query(
                "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ?)",
                [
                  answers.first,
                  answers.last,
                  answers.roleSelect,
                  answers.mangerSelect,
                ],
                (err, res) => {
                  if (err) {
                    throw err;
                  }
                  console.log(`
#=================================================================#
                    Employee Succesfully Added
#=================================================================#
                  `);
                  mainMenu();
                }
              );
            });
        }
      );
    });
}

function addDepartment() {
  inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the name of the new Depeartment",
          name: "newDepartment",
        },
      ])
      .then(function ({ newDepartment }) {
        // console.log("New Department " + newDepartment);
        var queryString = `INSERT INTO department (name) VALUES (?);`
        connection.query(queryString,
          [newDepartment],
          function(error, response) {
              if (error) throw error;
              console.log(`
#=================================================================#
                  Department Succesfully Added
#=================================================================#
              \n`);
              mainMenu();
          });
      });
}