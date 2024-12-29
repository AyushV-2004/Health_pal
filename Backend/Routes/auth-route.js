const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/authMiddleware");

router.route("/data").post(authcontroller.data)
router.route("/states").get(authcontroller.states)
router.route("/register").post(authcontroller.register)
router.route("/verification").post(authcontroller.verification)
router.route("/login").post(authcontroller.login)
router.route("/healthData").post(authcontroller.healthData)
router.route("/users").get(authMiddleware,authcontroller.users)
router.route("/getHealthData").post(authcontroller.getHealthData)
router.route("/medicalsNearme").get(authcontroller.medicalsNearMe)
router.route("/addHospital").post(authcontroller.addHospital)

module.exports = router