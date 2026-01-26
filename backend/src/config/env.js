const required = (key) => {
  if (!process.env[key]) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
  return process.env[key];
};

const ENV = {
  PORT: Number(process.env.PORT || 10000),
  NODE_ENV: process.env.NODE_ENV || "development",
  IS_PROD: process.env.NODE_ENV === "production",

  CLIENT_URL: process.env.CLIENT_URL || "",
  CLIENT_URLS: (process.env.CLIENT_URLS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),

  DB: {
    HOST: required("DB_HOST"),
    PORT: Number(process.env.DB_PORT || 3306),
    USER: required("DB_USER"),
    PASSWORD: required("DB_PASSWORD"),
    NAME: required("DB_NAME"),
  },

  JWT: {
    SECRET: required("JWT_SECRET"),
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
  },

  CLOUDINARY: {
    CLOUD_NAME: required("CLOUDINARY_CLOUD_NAME"),
    API_KEY: required("CLOUDINARY_API_KEY"),
    API_SECRET: required("CLOUDINARY_API_SECRET"),
  },
};

module.exports = { ENV };
