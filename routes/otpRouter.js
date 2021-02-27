const express = require("express");
const router = express.Router();

const {
  register,
  login,
  verifyOTP,
  resendOTP,
} = require("./../controller/authController");

router.route("/register").post(register);

router.route("/verify").post(verifyOTP);

router.route("/login").post(login);

router.route("/resend").post(resendOTP);

module.exports = router;
