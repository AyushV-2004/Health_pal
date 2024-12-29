const mongoose = require("mongoose");
const Covid = require("../models/data-model");
const User = require("../models/user-model");
const HealthData = require("../models/healthData-model");
const Hospitals = require("../models/medicalsNearme");
const data = async (req, res) => {
  const { district } = req.body;
  // console.log("District:", district);

  try {
    const data = await Covid.findOne({ district: district });

    console.log("Retrieved Data:", data); // Debugging statement

    if (data) {
      res.json(data);
    } else {
      res
        .status(404)
        .json({ message: "Data not found for the specified district." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
const states = async (req, res) => {
  try {
    const data = await Covid.find();

    if (data) {
      const districtNames = data.map((entry) => entry.district);

      res.json({ districts: districtNames });
    } else {
      res
        .status(404)
        .json({ message: "Data not found for the specified district." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
const verification = async (req, res) => {
  try {
    const { id } = req.body;
    const userUpdate = await User.findOneAndUpdate(
      { _id: id },
      { $set: { isVerified: true  } },
      { new: true }
    );

    if (!userUpdate) {
      return res.status(404).send({
        message: "User not found",
        dataCode: 0,
      });
    }

    return res.status(200).send({
      message: "User verified successfully",
      dataCode: 2,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal server error",
      dataCode: -1,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({email: email,password: password });
    if (userExist) {
      if (userExist.isVerified) {
        return res.send({
          message: "user found successfully",
          dataCode: 1,
          userId: userExist._id.toString(),
          token: await userExist.generateTokenlog(),
          username: userExist.userName,
        });
      } else {
        return res.send({
          message: "user Not Verified please Verify",
          dataCode: 2,
          username: userExist.userName,
        });
      }
    } else {
      return res.send({
     
        message: "user not found please login",
        dataCode: 3,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const register = async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
      phone,
      age,
      district,
      country,
      isAdmin,
    } = req.body;
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.send({ message: "user Already exists", dataCode: 1 });
    }

    const userCreated = await User.create({
      userName,
      email,
      password,
      phone,
      district,
      country,
      age,
      isAdmin,
    });
    return res.status(200).send({
      message: "user created successfully",
      dataCode: 2,
      email: userCreated.email,
      password: userCreated.password,
      username: userCreated.userName,
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log("err form reg", error);
  }
};
const users = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).send({ message: 'User data not found' });
    }

    const userData = req.user;
    res.send(userData);
  } catch (error) {
    console.error("Error from user controller:", error);
    res.status(500).send({ message: 'Internal server error' });
  }
};
const healthData = async (req,res)=>{
  try {

    const {
      email,
      age,
      weight,
      height,
      hereditaryDisease,
      ongoingDisease,
      allergy
    } = req.body;
   console.log({email,
    age,
    weight,
    height,
    hereditaryDisease,
    ongoingDisease,
    allergy});
 
    const userHealthCreated = await HealthData.create({
      email,
      age,
      weight,
      height,
      hereditaryDisease,
      ongoingDisease,
      allergy
    });
    return res.status(200).send({
      message: "User Health Data  Added successfully",
      dataCode: 2,
      email: userHealthCreated.email,
    });
  } catch (error) {
    console.log("err form reg", error);
  }
}
const getHealthData = async (req,res)=>{
  try {

    const { email } = req.body;
    const userHealthData = await HealthData.findOne({email});
    return res.status(200).send({
      message: "User Found",
      dataCode: 2,
      data:userHealthData,
    });
  } catch (error) {
    console.log("err form reg", error);
  }
}
const medicalsNearMe = async (req, res) => {
  const { state } = req.query; // Retrieve state from query parameter

  try {
    // Fetch medical centers based on the selected state
    const medicalCenters = await Hospitals.find({ district: state });

    // Check if medical centers were found
    if (!medicalCenters || medicalCenters.length === 0) {
      return res.status(404).json({ error: 'No medical centers found for the selected state' });
    }

    // Send the medical centers data in the response
    res.json(medicalCenters);
  } catch (error) {
    console.error('Error fetching medical centers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addHospital = async (req,res)=>{
  try {
    const {
      hospitalName,
      location,
      specialty,
      district,
    } = req.body;


    const HospitalCreated = await Hospitals.create({
      hospitalName,
      location,
      specialty,
      district,
    });
    return res.status(200).send({
      message: "Hospital created successfully",
      dataCode: 2,
    });
  } catch (error) {
    console.log("err form reg", error);
  }
}

module.exports = { data, states, register, verification, login, users ,healthData,getHealthData,medicalsNearMe,addHospital};
