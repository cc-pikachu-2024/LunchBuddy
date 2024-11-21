module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: "HOST_NAME",
      user: "USER_NAME",
      password: "PASSWORD",
      database: "DB_NAME",
      port: 5432,
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
