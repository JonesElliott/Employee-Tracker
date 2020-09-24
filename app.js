const mysql = require("mysql");
const connection = require("./db/connection");
const cTable = require('console.table');
const inquirer = require("inquirer");
// var queryAllEmployees = require("./db/query");


// Initiate connection to MySQL server
connection.connect(function(error) {
    if (error) throw error;
    console.log("Connected as id " + connection.threadId + "\n\n");
    mainMenu();
});

// Function to display the main mneu
function mainMenu() {
    console.log(`
  #=================================================================#
  |                       Employee Manager                          |
  |                Micro-Management at it's finest                  |
  #=================================================================#
      `);
    inquirer
      .prompt([
        {
          type: "list",
          message: "Main Menu\nPlease select from the following options",
          choices: [
            "View All Employees",
            "View Employees by Department",
            "View Employees by Manager",
            "Add New Employee",
            "Remove Emplyee",
            "Update Employee's Role",
            "Update Emplyee's Manager",
            "View All Roles",
            "Add Role",
            "Remove Role",
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
            viewDepartments();
            break;
          case "View Employees by Manager":
            viewManagers();
            break;
          case "Add New Employee":
            addNewEmployee();
            break;
          case "Remove Employee":
            removeEmplyee();
            break;
          case "Update Employee's Role":
            updateEmployeeRole();
            break;
          case "Update Employee's Manager":
            updateEmployeeManager();
            break;
          case "View All Roles":
            viewAllRoles();
            break;
          case "Add Role":
            addNewRole();
            break;
          case "Remove Role":
            removeRole();
            break;
          default:
            "Hmmm, that's not supposed to happen...";
        }
      });
  }


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
        JOIN department ON role.department_id = department.id;`,
        function(error, response) {
            if (error) throw error;
            console.log('\n');
            console.table(response);
            mainMenu();
        });
}
