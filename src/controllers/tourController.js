exports.checkId = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  if (!req.params.id) {
    return res.status(404).json({
      status: "failed",
      message: "Invalid ID",
    });
  }
  next();
};
exports.getAllTours = (req, res) => {
  res.status(500).json({
    status: "failed",
    message: "This route is not yet defined",
  });
};
exports.getTours = (req, res) => {
  res.status(500).json({
    status: "failed",
    message: "This route is not yet defined",
  });
};
exports.createTours = (req, res) => {
  res.status(500).json({
    status: "failed",
    message: "This route is not yet defined",
  });
};
exports.updateTours = (req, res) => {
  res.status(500).json({
    status: "failed",
    message: "This route is not yet defined",
  });
};
exports.deleteTours = (req, res) => {
  res.status(500).json({
    status: "failed",
    message: "This route is not yet defined",
  });
};
