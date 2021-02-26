const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const { PhoneNumbers, OTP } = require("./../models");
const generateOTP = require("./../utils/generateOTP");
const sendOTP = require("./../utils/sendOTP");

const signToken = (phonenumber) => {
  return jwt.sign({ phonenumber }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.phonenumber);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

router.post("/register", async (req, res) => {
  const { phonenumber } = req.body;
  try {
    const exists = await PhoneNumbers.findOne({
      where: {
        phonenumber,
      },
    });
    if (!exists) {
      const otp = generateOTP();
      const added = await OTP.create({
        phonenumber,
        otp,
      });
      await sendOTP({ otp, phonenumber });
      res
        .status(200)
        .send(`OTP sent to number ${phonenumber} and your otp is ${otp}`);
    } else {
      res.send(`This number already exists`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("not able to register");
  }
});

router.post("/verify", async (req, res) => {
  const { name, phonenumber, otp, from_ip, from_device } = req.body;
  try {
    const verifyOTP = await OTP.findOne({
      where: {
        phonenumber,
        otp,
      },
    });
    if (verifyOTP) {
      const exists = await PhoneNumbers.findOne({
        where: {
          phonenumber,
        },
      });
      if (exists) {
        createSendToken(exists, 200, res);
      } else {
        await verifyOTP.destroy();
        const newUser = await PhoneNumbers.create({
          name,
          phonenumber,
          from_ip,
          from_device,
        });
        createSendToken(newUser, 200, res);
      }
    } else {
      res.send(`OTP is wrong`);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { phonenumber } = req.body;
  try {
    const exists = await PhoneNumbers.findOne({
      where: {
        phonenumber,
      },
    });
    if (!exists) {
      res.send(`This number does not exist. please register`);
    } else {
      const otp = generateOTP();
      const added = await OTP.create({
        phonenumber,
        otp,
      });
      await sendOTP({ otp, phonenumber });

      res
        .status(200)
        .send(`OTP sent to number ${phonenumber} and your otp is ${otp}`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("not able to login");
  }
});

router.post("/resend", async (req, res) => {
  const { phonenumber } = req.body;
  try {
    const exists = await OTP.findOne({
      where: {
        phonenumber,
      },
    });
    if (exists) {
      const otp = generateOTP();
      exists.otp = otp;
      exists.save();
      await sendOTP({ otp, phonenumber });
      res
        .status(200)
        .send(`OTP sent to number ${phonenumber} and your OTP is ${otp}`);
    } else {
      const otp = generateOTP();
      const added = await OTP.create({
        phonenumber,
        otp,
      });
      await sendOTP({ otp, phonenumber });
      res
        .status(200)
        .send(`OTP sent to number ${phonenumber} and your otp is ${otp}`);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
