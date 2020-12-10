var mysql = require('mysql');
import session from 'express-session';
const MySQLStore = require('express-mysql-session')(session);
const options = require('../config/sessionStore');

var connection = mysql.createConnection(options);
const sessionStore = new MySQLStore({}, connection);
console.log("Successfully connected to the session store");
module.exports = sessionStore;
