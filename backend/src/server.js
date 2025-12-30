require("dotenv").config();
const express = require("express");
const sequelize = require("./config/sequelize");

const app = express();
app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 10000;

async function connectDB(retries = 5, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      await sequelize.authenticate();
      console.log("Database connected");
      return;
    } catch (err) {
      console.warn(`DB not ready, retrying in ${delay / 1000}s... (${i + 1}/${retries})`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
  throw new Error("Unable to connect to database after multiple attempts");
}

(async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: true });
    console.log("Models synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
})();
