module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "amuEE4252",
  DB: "sampleDB",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
