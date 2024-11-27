const app = require("./app");
const _ = require("./dotenv");

// ローカル環境用のサーバー起動コード
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
