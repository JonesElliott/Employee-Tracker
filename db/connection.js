const mysql = require("mysql");

// Connection Configuration
// -----------------------------------------------------------------
const connectionConfig = {
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "root",
    database: "employeeDB"
}
  
  var connection = mysql.createConnection(connectionConfig);
  
  module.exports = connection;
