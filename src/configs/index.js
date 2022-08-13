module.exports = {
  MONGO_URL:
    process.env.MONGO_URL || "mongodb://127.0.0.1:27017/kendalisada-tour",
  PORT: process.env.PORT || "3001",
  JWT_KEY: process.env.JWT_KEY || "Rahasia-banget-jWT*token",
  JWT_EXPIRE: process.env.JWT_EXPIRE, //? gimana cara ubah jadi string expiresIn
};
