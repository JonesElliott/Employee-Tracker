var mysql = require("mysql");
var inquirer = require("inquirer");
var mainMenu = require("./lib/menus/menu");

const connectionConfig = {
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employeedb"
}

var connection = mysql.createConnection(connectionConfig);

connection.connect(function(error) {
    if (error) throw error;
    console.log("Connected as id " + connection.threadId + "\n\n");
    mainMenu();
});