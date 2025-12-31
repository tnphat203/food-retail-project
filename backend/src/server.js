const app = require("./app");
const sequelize = require("./config/sequelize");
const connectDB = require("./config/database");
const { ENV } = require("./config/env");

(async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: true });

    app.listen(ENV.PORT, () =>
      console.log(`✅ Server running on port ${ENV.PORT}`)
    );
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
})();
