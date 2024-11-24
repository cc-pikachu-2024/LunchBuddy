const dotenv = require("dotenv");

// NODE_ENVの値に応じて適切な.envファイルを選択
const envFile = (() => {
  switch (process.env.NODE_ENV) {
    case "production":
      return ".env.production";
    case "development":
      return ".env.development";
    default:
      return "";
  }
})();
console.log(`Loaded environment variables from ${envFile}`);

// dotenvを設定
module.exports = dotenv.config({ path: envFile });
