const dotenv = require("dotenv");

// NODE_ENVの値に応じて適切な.envファイルを選択
const envFile = (() => {
  switch (process.env.NODE_ENV) {
    case "production":
      return ".env.prod";
    case "development":
      return ".env.dev";
    default:
      return "";
  }
})();
console.log(`Loaded environment variables from ${envFile}`);

// dotenvを設定
module.exports = dotenv.config({ path: envFile });
