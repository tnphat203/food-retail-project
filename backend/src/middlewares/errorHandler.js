module.exports = function errorHandler(err, req, res, next) {
  console.error("Error:", err.message);

  if (err.message?.includes("CORS")) {
    return res.status(403).json({
      message: "CORS error",
      detail: err.message,
    });
  }

  res.status(err.status || 500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "production" ? undefined : err.message,
  });
};
