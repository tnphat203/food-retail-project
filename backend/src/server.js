require("dotenv").config();
const app = require("./app");

const { sequelize } = require("./models");
const { ENV } = require("./config/env");

const connectWithRetry = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to DB");

    await sequelize.sync({ logging: false });

    app.listen(ENV.PORT, () =>
      console.log(`🚀 Server running on port ${ENV.PORT}`),
    );
  } catch (error) {
    console.error("⏳ DB not ready, retrying in 5s...");
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();
