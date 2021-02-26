const express = require("express");
const router = express.Router();

const {
  register,
  login,
  verifyOTP,
  resendOTP,
} = require("./../controller/authController");

router.post("/register", register);
router.post("/verify", verifyOTP);
router.post("/login", login);
router.post("/resend", resendOTP);

module.exports = router;
