// const connection = require("../db/connection");
// // const mainMenu = require("../lib/menu");

// function getAllEmployees(connection) {
//     connection.query(
//         "SELECT * FROM employee",
//         function(error, response) {
//             if (error) throw error;
//             console.log('\n');
//             console.table(response);
//             mainMenu();
//         });
// }


// async function getAllEmployees(connection) {
//     const mainMenu = require("../lib/menu");
//     try {
//         connection.query(
//         "SELECT * FROM employee",
//         function(error, response) {
//             if (error) throw error;
//             console.log('\n');
//             console.table(response);
//             mainMenu();
//         });
//     }
//     catch (rejected) {
//         console.log("Rejected Message: " + rejected);
//     }
//     mainMenu();
// }

// module.exports = getAllEmployees;