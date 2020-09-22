var inquirer = require("inquirer");

function mainMenu() {
    console.log(`
#=================================================================#
|                       Employee Manager                          |
|                Micro-Management at it's best                    |
#=================================================================#
    `);
    inquirer
    .prompt([
      {
        type: 'list',
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
            "Remove Role"
        ],
        name: "selection"
      }]).then(function({ selection }) {
          switch (selection) {
              case "View All Employees":
                  viewAllEmployees();
                  break;
              case "View Employees by Department":
                  viewDepartments();
                  break;
              case "View Employees by Manager":
                  viewManagers();
                  break;
              case "Add New Employee":
                  viewManagers();
                  break;
              case "Remove Employee":
                  viewManagers();
                  break;
              case "Update Employee's Role":
                  viewManagers();
                  break;
              case "Update Employee's Manager":
                  viewManagers();
                  break;
              case "View All Roles":
                  viewManagers();
                  break;
              case "Add Role":
                  viewManagers();
                  break;
              case "Remove Role":
                  viewManagers();
                  break;
              default:
                  "Hmmm, that's not supposed to happen...";
          }
      });
}

module.exports = mainMenu;