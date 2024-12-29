const mongoose = require("mongoose");

const covidScheme = new mongoose.Schema({
  district: {
    type: String,
  },
  activeCases: {
    type: Number,
  },
  totalCases: {
    type: Number,
   
  },
  recoveredCases:{
    type:Number,
  },
  deceasedCases: {
    type: Number,
  },
});




const Covid = new mongoose.model("covids", covidScheme);
module.exports = Covid;
