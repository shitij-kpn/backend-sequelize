const jwt = require("jsonwebtoken");
const { Client, OTP } = require("./../models");
const generateOTP = require("./../utils/generateOTP");
const { promisify } = require("util");

const catchAsync = require("../utils/catchAsync");

const signToken = (phonenumber) => {
  return jwt.sign({ phonenumber }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (client, statusCode, res) => {
  const token = signToken(client.phonenumber);
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
      client,
    },
  });
};

const checkIfUserExists = async (phonenumber) => {
  return Client.findOne({
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
      const newUser = await Client.create({
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
  }
  await generateOTP(phonenumber, res);
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.checkToken = catchAsync(async (req, res, next) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.headers.cookie && req.headers.cookie.split("=")[0] === "jwt") {
    token = req.headers.cookie.split("=")[1];
  }

  if (!token) {
    return res.send("no token found not authorised");
  }

  //  Verification token
  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log(error);
    return res.send("please login again");
  }

  // Check if user still exists
  const currentUser = await checkIfUserExists(decoded.phonenumber);

  if (!currentUser) {
    return res.send("this user does not exist anymore");
  }

  res.user = currentUser;
  next();
});
