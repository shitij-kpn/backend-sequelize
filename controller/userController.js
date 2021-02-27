const jwt = require("jsonwebtoken");
const { Client } = require("./../models");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");

const checkIfUserExists = async (phonenumber) => {
  return Client.findOne({
    where: {
      phonenumber,
    },
  });
};

exports.getUser = catchAsync(async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.headers.cookie.split("=")[0] === "jwt") {
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
    return res.json(error);
  }

  // Check if user still exists
  const currentUser = await checkIfUserExists(decoded.phonenumber);

  if (!currentUser) {
    return res.send("this user does not exist anymore");
  }

  res.status(200).json(currentUser);
});
