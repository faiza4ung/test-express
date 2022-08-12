const Tour = require("../models/tourModel");

//** GET ALL TOUR */
exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query); //? check query input
    //** BUILD QUERY */
    //** 1) Filtering */
    const queryObject = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObject[el]);

    //** 2) Advanced filtering */
    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    console.log(JSON.parse(queryString));
    //? { difficulty: 'mid', duration: { $gte: 5 } }
    //? { difficulty: 'mid', duration: { gte: '5' } } <- this what we get
    //? gte, gt, lte, lt
    const query = Tour.find(JSON.parse(queryString));

    //** EXECUTE QUERY */
    const tours = await query;

    //** SEND RESPONSE */
    res.status(200).json({
      status: "success",
      result: tours.length,
      message: "Data Found",
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

//** GET TOUR BY ID */
exports.getTours = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //? Tour.findOne({ _id: req.params.id })
    res.status(200).json({
      status: "success",
      message: "Data Found",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "Data not Found",
      error: err,
    });
  }
};

//** CREATE A TOUR */
exports.createTours = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Data Tour Created",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

//** UPDATE A TOUR */
exports.updateTours = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      message: "Data Tour Updated",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

//** DELETE A TOUR */
exports.deleteTours = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Data Tour Removed",
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "Data not Found",
    });
  }
};
