const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
require("express-async-errors");

const corsMiddleware = require("./config/cors");
const errorHandler = require("./middlewares/errorHandler");

const userRoutes = require("./routes/user.route");
const healthRoutes = require("./routes/health.route");

const app = express();

app.use(helmet());
app.use(corsMiddleware());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);
app.use("/", healthRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
  });
});

app.use(errorHandler);

module.exports = app;
