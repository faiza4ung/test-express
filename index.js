const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Hello from server", app: "Kendalisada Tour" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on http://localhost/${port}...`);
});
