require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/sequelize");

const PORT = process.env.PORT || 10000;

/* Connect to database with retry */
async function connectDB(retries = 5, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      await sequelize.authenticate();
      console.log("Database connected");
      return;
    } catch (err) {
      console.warn(
        `Database not ready, retrying in ${delay / 1000}s (${i + 1}/${retries})`
      );
      await new Promise(res => setTimeout(res, delay));
    }
  }
  throw new Error("Unable to connect to database");
}

/* Start server */
(async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: true });
    console.log("Models synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
