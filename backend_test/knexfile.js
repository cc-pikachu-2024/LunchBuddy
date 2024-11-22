module.exports = {
  development: {
    client: "postgresql",
    connection: {
      // host: "HOST_NAME",
      user: "shiobaraakira",
      // password: "PASSWORD",
      database: "lunchbuddy",
      // port: 5432,
      // ssl: {
      //   require: true,
      //   rejectUnauthorized: false,
      // },
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
