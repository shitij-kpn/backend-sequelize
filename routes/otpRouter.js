const express = require("express");
const router = express.Router();

const { PhoneNumbers, OTP } = require("./models");
const generateOTP = require("./utils/generateOTP");
const sendOTP = require("./utils/sendOTP");

router.post("/register", async (req, res) => {
  const { number } = req.body;
  try {
    const exists = await PhoneNumbers.findOne({
      where: {
        phonenumber: number,
      },
    });
    if (!exists) {
      const otp = generateOTP();
      const added = await OTP.create({
        phonenumber: number,
        otp,
      });
      await sendOTP({ otp, number });
      res
        .statusCode(200)
        .send(`OTP sent to number ${number} and your otp is ${otp}`);
    } else {
      res.send(`This number already exists`);
    }
  } catch (error) {
    res.statusCode(500).json(error);
  }
});

router.post("/verify", async (req, res) => {
  const { name, phonenumber, otp } = req.body;
  try {
    const verifyOTP = await OTP.findOne({
      where: {
        phonenumber,
        otp,
      },
    });
    if (verifyOTP) {
      await verifyOTP.destroy();
      await PhoneNumbers.create({
        name,
        phonenumber,
      });
      res.send(`congrats ${phonenumber} verfied`);
    } else {
      res.send(`wrong`);
    }
  } catch (error) {
    return res.statusCode(500).json(error);
  }
});
