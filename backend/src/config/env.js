const required = (key) => {
  if (!process.env[key]) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
  return process.env[key];
};

const ENV = {
  // App
  PORT: Number(process.env.PORT || 10000),
  NODE_ENV: process.env.NODE_ENV || "development",
  IS_PROD: process.env.NODE_ENV === "production",

  // CORS
  CLIENT_URL: process.env.CLIENT_URL || "",
  CLIENT_URLS: (process.env.CLIENT_URLS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),

  // Database
  DB: {
    HOST: required("DB_HOST"),
    PORT: Number(process.env.DB_PORT || 3306),
    USER: required("DB_USER"),
    PASSWORD: required("DB_PASSWORD"),
    NAME: required("DB_NAME"),
  },
};

module.exports = { ENV };
