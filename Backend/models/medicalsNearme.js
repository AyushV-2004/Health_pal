const mongoose = require("mongoose");

const medicalsNearme = new mongoose.Schema({
  hospitalName: {
    type: String,
    required: true,
  },
  location: {
    type: String, // Change the type to String
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
});




const Hospitals = new mongoose.model("Hospitals",medicalsNearme);
module.exports = Hospitals;
