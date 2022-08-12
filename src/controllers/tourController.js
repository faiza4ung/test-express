const Tour = require("../models/tourModel"),
  APIFeatures = require("../utils/apiFeatures"),
  catchAsync = require("../utils/catchAsync"),
  AppError = require("../utils/appError");

//** TOP TOUR ENDPOINT - ALIASING with middleware */
exports.topTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

//** GET ALL TOUR */
exports.getAllTours = catchAsync(async (req, res, next) => {
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
});

//** GET TOUR BY ID */
exports.getTours = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.param.id);
  //? Tour.findOne({ _id: req.params.id })
  if (!tour) {
    return next(new AppError(`Data not found`, 404));
  }
  res.status(200).json({
    status: "success",
    message: "Data Found",
    data: {
      tour,
    },
  });
});

//** CREATE A TOUR */
exports.createTours = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Data Tour Created",
    data: {
      tour: newTour,
    },
  });
});

//** UPDATE A TOUR */
exports.updateTours = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.param.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) {
    return next(new AppError("data not Found gaes", 404));
  }
  
  res.status(200).json({
    status: "success",
    message: "Data Tour Updated",
    data: {
      tour,
    },
  });
});

//** DELETE A TOUR */
exports.deleteTours = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.param.id);
  
  if (!tour) {
    return next(new AppError(`Data not found`, 404));
  }

  res.status(200).json({
    status: "success",
    message: "Data Tour Removed",
  });
});

//** GET STATS - AGGREGATE */
exports.getTourStats = catchAsync(async (req, res, next) => {
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
});

//** MONTHLY PLAN */
exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1; //2022
  const plan = await Tour.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        numTourStarts: { $sum: 1 },
        tours: { $push: "$name" },
      },
    },
    {
      $addFields: {
        month: "$_id",
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        numTourStarts: -1,
      },
    },
    { $limit: 5 },
  ]);

  res.status(200).json({
    status: "success",
    data: { plan },
  });
});
