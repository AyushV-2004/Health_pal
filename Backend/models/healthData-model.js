const mongoose = require("mongoose");

const healthDataScheme = new mongoose.Schema({
  email: {
    type: String,
  },
  age: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  hereditaryDisease: {
    type: String,
  },
  ongoingDisease: {
    type: String,
  },
  allergy: {
    type: String,
  },
});




const HealthData = new mongoose.model("healthDatas", healthDataScheme);
module.exports = HealthData;
