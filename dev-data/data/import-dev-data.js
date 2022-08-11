const { connect } = require("mongoose"),
  { readFileSync } = require("fs"),
  { MONGO_URL } = require("../../src/configs"),
  Tour = require("../../src/models/tourModel");

//? CONNECT FIRST TO MONGO
try {
  connect(MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log("Try Connect");
} catch (error) {
  console.log(
    "Galat dalam mengoneksikan ke database, saya undur diri dulu mas"
  );
  process.exit();
}

//? READ JSON FILE
const tours = JSON.parse(
  readFileSync(`${__dirname}/sample-tour.json`, "utf-8")
);

//? IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data Successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//? DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data Successfully removed");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

// console.log(process.argv);
