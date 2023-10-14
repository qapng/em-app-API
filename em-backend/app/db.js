const mysql = require('mysql');
const dbConfig = require('./config/db.config');

const conn = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
  ssl: {
    ca: dbConfig.SSL.ca,
  },
});

module.exports = conn;
