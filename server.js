const app = require("./src/app"),
  { PORT, MONGO_URL } = require("./src/configs"),
  { connectDB } = require("./src/configs/db");

//** START SERVER **/
app.listen(PORT, () => {
  console.log(`App running on http://127.0.0.1:${PORT}...`);
});

//** CONNECT DATABASE **/
connectDB(MONGO_URL);
