const mysql = require("mysql");
const connection = require("./db/connection");
const cTable = require('console.table');
const inquirer = require("inquirer");
var Employee = require('./scripts/employee');
const { connect } = require("./db/connection");

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
            queryAllByDepartment();
            break;
          case "View Employees by Manager":
            queryAllByManager();
            break;
          case "Add New Employee":
            getNewEmployeeInfo();
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

var roleList = [];
var employeeList = [];

// Get roles list to display
function getRoleList() {
  return new Promise(function (resolve, reject) {
      connection.query(
          'SELECT * FROM role',
          [],
          function (error, data) {
              if (error) reject(error);
              resolve(data.map(record => record.title))
          });
  }).then(function (roles) {
    roles.forEach(title => {
      roleList.push(title);
    })
});
}

// Get employee list to display
function getEmployeeList() {
  return new Promise(function (resolve, reject) {
      connection.query(
          `SELECT * FROM employee`,
          [],
          function (error, data) {
              if (error) reject(error);
              resolve(data.map(record => record.first_name))
          });
  }).then(function (employees) {
    employees.forEach(names => {
      employeeList.push(names);
    })
});
}


function getNewEmployeeInfo() {
  getRoleList();
  getEmployeeList();
  inquirer
      .prompt([
        {
          type: "inpput",
          message: "New Employee\nEnter Employee's First Name",
          name: "firstName"
        },
        {
          type: "inpput",
          message: "New Employee\nEnter Employee's Last Name",
          name: "lastName"
        },
        {
          name: 'roles',
          message: 'Select Job Title',
          type: 'list',
          choices: roleList
        },
        {
          name: 'manager',
          message: 'Select Employee\'s Manager',
          type: 'list',
          choices: employeeList
        }
      ])
      .then(function ({ firstName, lastName, roles, manager }) {
        newEmployee.fName = firstName;
        newEmployee.lName = lastName;
        newEmployee.role = roles;
        newEmployee.manager = manager;
        buildNewEmployeeQuery(newEmployee);
        console.log(newEmployee);
      });
}

// Get Job Title ID list to display
var newRoleID = 0;

function getRoleID(jobTitle) {
  var queryString = 'SELECT * FROM role WHERE role.title = ';
  queryString += "\"" + jobTitle + "\";";
  console.log("Get Role ID String: " + queryString);

  return new Promise(function (resolve, reject) {
      connection.query(
          queryString,
          [],
          function (error, data) {
              if (error) reject(error);
              resolve(data.map(record => record.id))
              // resolve(data);
          });
  }).then(function (titleID) {
    newRoleID = titleID;
    console.log("THIS IS THE ROLE ID: " + titleID);
    console.log("THIS IS THE ROLE ID: " + newRoleID);
});
}



function buildNewEmployeeQuery(newEmployee) {
  getRoleID(newEmployee.role).then(function(){
    var queryString = "INSERT INTO employee";

  queryString += " (first_name, last_name, role_id, manager_id) ";
  queryString += "VALUES (";
  queryString += newEmployee.fName + ", " +
    newEmployee.lName + ", " +
    newRoleID + ", " +  // <--- Role ID
    newEmployee.manager;
  queryString += ") ";

  console.log("This is the query string: \n" + queryString);
  })

  
  // return new Promise(function (resolve, reject) {
  //   connection.query(
  //     queryString,
  //     [],
  //     function (error, data) {
  //       if (error) reject(error);
  //       resolve(data.map(record => record.title))
  //     });
  // }).then(function (roles) {
  //     roles.forEach(title => {
  //     roleList.push(title);
  //     })
  // });
}