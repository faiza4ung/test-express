module.exports = {
  MONGO_URL:
    process.env.MONGO_URL || "mongodb://127.0.0.1:27017/kendalisada-tour",
  PORT: process.env.PORT || "3001",
};
