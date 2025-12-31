require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models"); // import models trước sync
const connectDB = require("./config/database");
const { ENV } = require("./config/env");

(async () => {
  try {
    await connectDB(); // retry connect DB
    await sequelize.sync({ alter: true });

    app.listen(ENV.PORT, () =>
      console.log(`✅ Server running on port ${ENV.PORT}`)
    );
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
})();
