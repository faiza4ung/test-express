const app = require("./src/app");

//** START SERVER **/
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on http://127.0.0.1:${port}...`);
});
