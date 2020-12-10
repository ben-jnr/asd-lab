import mysql from "mysql";
const config = require("../config/db");

// Create a connection to the database
const connection = mysql.createConnection({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB
});

// open the MySQL connection
connection.connect((error:any) => {
  if (error) {
    console.log("Error in database connection");
    console.log(error);
  }
  console.log("Successfully connected to the database");
});

module.exports = connection;
