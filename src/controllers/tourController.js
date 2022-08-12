const Tour = require("../models/tourModel");

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
    //** BUILD QUERY */
    console.log(req.query); //? check query input

    //** 1.A) Filtering */
    const queryObject = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObject[el]);

    //** 1.B) Advanced filtering */
    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    // console.log(JSON.parse(queryString));
    //? { difficulty: 'mid', duration: { $gte: 5 } }
    //? { difficulty: 'mid', duration: { gte: '5' } } <- this what we get
    //? gte, gt, lte, lt
    let query = Tour.find(JSON.parse(queryString));

    //** 2) Sorting */
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      // console.log(sortBy)
      query = query.sort(sortBy);
      //? sort('price ratingsAverage')
    } else {
      query = query.sort("-ceatedAt");
    }

    //** 3) Field limiting */
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    //** 4) Pagination */
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;

    //? page=2&limit=5, 1-5, page 1, 6-10, page 2, dst
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error("This page does not exist");
    }

    //** EXECUTE QUERY */
    const tours = await query;
    //? query.sort().select().skip().limit()

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
