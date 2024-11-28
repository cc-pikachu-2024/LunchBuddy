const _ = require("./dotenv");

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      // port: process.env.DB_PORT,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/demo_seeds",
    },
  },
  production: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      // port: process.env.DB_PORT,
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/demo_seeds",
    },
  },
};
