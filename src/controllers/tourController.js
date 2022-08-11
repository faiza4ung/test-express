const getAllTours = (req, res) => {
  res.status(200).json({ message: "GET ALL Method" });
};
const getTours = (req, res) => {
  res.status(200).json({ message: "GET BY ID Method" });
};
const createTours = (req, res) => {
  res.status(200).json({ message: "ADD Method" });
};
const updateTours = (req, res) => {
  res.status(200).json({ message: "UPDATE Method" });
};
const deleteTours = (req, res) => {
  res.status(200).json({ message: "DELETE Method" });
};

module.exports = {
  getAllTours,
  getTours,
  createTours,
  updateTours,
  deleteTours,
};
