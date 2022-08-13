const { connect } = require("mongoose");

exports.connectDB = async (url) => {
  try {
    await connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("database terhubung");
  } catch (err) {
    console.log(err.name, err.message);
    console.log(
      "Galat dalam mengoneksikan ke database, saya undur diri dulu mas"
    );
    // process.exit();
  }
};
