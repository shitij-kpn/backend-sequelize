const express = require("express");
const router = express.Router();

const {
  register,
  login,
  verifyOTP,
  resendOTP,
  logout,
} = require("./../controller/authController");

router.route("/register").post(register);

router.route("/verify").post(verifyOTP);

router.route("/login").post(login);

router.route("/resend").post(resendOTP);

router.route("/logout").post(logout);

module.exports = router;
