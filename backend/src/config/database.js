const sequelize = require("./sequelize");

module.exports = async function connectDB(retries = 5, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      await sequelize.authenticate();
      console.log("✅ Database connected");
      return;
    } catch {
      console.warn(`⚠️ DB retry ${i + 1}/${retries}`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error("❌ Unable to connect to database");
};
