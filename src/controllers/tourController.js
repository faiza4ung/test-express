const Tour = require("../models/tourModel"),
  APIFeatures = require("../utils/apiFeatures");

//** TOP TOUR ENDPOINT - ALIASING with middleware */
exports.topTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

//** GET ALL TOUR */
exports.getAllTours = async (req, res) => {
  try {
    //? check query input
    // console.log(req.query);

    //** EXECUTE QUERY */
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

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
      message: err.message,
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

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 3.5 } },
      },
      {
        $group: {
          // _id: "$ratingsAverage",
          _id: { $toUpper: "$difficulty" },
          numTours: { $sum: 1 },
          numRatings: { $sum: "$ratingsQuantity" },
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      {
        $sort: {
          avgPrice: 1,
        },
      },
      // {
      //   $match: { _id: { $ne: "EASY" } },
      // },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};
