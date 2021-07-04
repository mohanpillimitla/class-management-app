module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "31Mohan@31",
  DB: "api",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
