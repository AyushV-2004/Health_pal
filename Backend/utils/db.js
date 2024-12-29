const mongoose = require("mongoose");
const URI = process.env.MONGODB_URL;
const url = URI.toString();
const db = async () => {
  try {
    await mongoose.connect(url);
    console.log("connection established");
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;
