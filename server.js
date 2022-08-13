const app = require("./src/app"),
  { PORT, MONGO_URL } = require("./src/configs"),
  { connectDB } = require("./src/configs/db");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT REJECTION ... Shutting Down. . .");
  console.log(err.name, err.message);
  process.exit(1);
});

//** START SERVER **/
const server = app.listen(PORT, () => {
  console.log(`App running on http://127.0.0.1:${PORT}...`);
});

//** CONNECT DATABASE **/
connectDB(MONGO_URL);

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLE REJECTION ... Shutting Down. . .");
  server.close(() => {
    process.exit(1);
  });
});

// console.log(u);
