require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userScheme = new mongoose.Schema({
  userName: {
    require: true,
    type: String,
  },
  email: {
    require: true,
    type: String,
  },
  password: {
    require: true,
    type: String,
  },
  phone: {
    require: true,
    type: BigInt,
  },
  district: {
    type: String,
  },
  country: {
    type: String,
  },
  age: {
    type: Number,
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  isVerified: {
   type:Boolean,
   default:false
  },
});


const sign = process.env.JWT_SECRET_KEY; 
// define modal (make the first letter capital)



userScheme.methods.generateTokenlog = async function(){
  try {
    return jwt.sign({
      userId: this._id.toString(),
      email: this.email,
      district:this.district,
      country:this.country,
      age:this.age,
      isAdmin: this.isAdmin,
    },
    sign ,{
      expiresIn:"1d",
    }
    );
  } catch (error) {
    console.error(error);
  }
}





const User = new mongoose.model("users", userScheme);
module.exports = User;
