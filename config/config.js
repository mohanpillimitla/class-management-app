require("dotenv").config();
const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;

module.exports = {
  development: {
    username: "postgres",
    password: "31Mohan@31",
    database: "api",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "postgres",
    password: "31Mohan@31",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "postgres",
    password: "31Mohan@31",
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
