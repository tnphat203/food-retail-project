require("dotenv").config();
const app = require("./app");

const { sequelize } = require("./models");

const { ENV } = require("./config/env");

(async () => {
  try {
    await sequelize.authenticate();

    await sequelize.sync({ alter: true, logging: false });

    app.listen(ENV.PORT, () =>
      console.log(`✅ Server running on port ${ENV.PORT}`)
    );
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
})();
