const express = require("express");

const app = express();
app.use(express.json())

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Hello from server", app: "Kendalisada Tour" });
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.status(201).json({ message: "POST METHOD" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on http://localhost/${port}...`);
});
