const jwt = require("jsonwebtoken");
const { PhoneNumbers, OTP } = require("./../models");
const generateOTP = require("./../utils/generateOTP");

const catchAsync = require("../utils/catchAsync");

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

const checkIfUserExists = async (phonenumber) => {
  return PhoneNumbers.findOne({
    where: {
      phonenumber,
    },
  });
};

exports.register = catchAsync(async (req, res) => {
  const { phonenumber } = req.body;
  const exists = await checkIfUserExists(phonenumber);
  if (!exists) {
    await generateOTP(phonenumber, res);
  } else {
    res.send(`This number already exists`);
  }
});

exports.login = catchAsync(async (req, res) => {
  const { phonenumber } = req.body;
  try {
    const exists = await checkIfUserExists(phonenumber);
    if (!exists) {
      res.send(`This number does not exist. please register`);
    } else {
      await generateOTP(phonenumber, res);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("not able to login");
  }
});

exports.verifyOTP = catchAsync(async (req, res) => {
  const { name, phonenumber, otp, from_ip, from_device } = req.body;
  const verifyOTP = await OTP.findOne({
    where: {
      phonenumber,
      otp,
    },
  });
  if (verifyOTP) {
    const exists = await checkIfUserExists(phonenumber);
    if (exists) {
      await verifyOTP.destroy();
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
    res.send(`OTP or phone number is wrong`);
  }
});

exports.resendOTP = catchAsync(async (req, res) => {
  const { phonenumber } = req.body;
  const exists = await OTP.findOne({
    where: {
      phonenumber,
    },
  });

  if (exists) {
    await exists.destroy();
    await generateOTP(phonenumber, res);
  } else {
    await generateOTP(phonenumber, res);
  }
});
