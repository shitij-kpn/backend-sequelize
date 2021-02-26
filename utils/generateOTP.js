const { OTP } = require("./../models");
const axios = require("axios");

function getOTP() {
  let otp = Math.random();
  otp = otp * 1000000;
  otp = parseInt(otp);
  return otp;
}

const sendOTP = async (otp, phonenumber) => {
  const apistring = `http://api.msg91.com/api/v2/sendsms?authkey=${
    process.env.AUTH_KEY
  }&mobiles=${phonenumber}&message=${
    "Your otp is" + otp
  }&sender=MSGIND&route=4&country=91`;
  try {
    const response = await axios.get(apistring);
    console.log("OTP sent");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const generateOTP = async (phonenumber, res) => {
  const otp = getOTP();
  const added = await OTP.create({
    phonenumber,
    otp,
  });
  await sendOTP(otp, phonenumber);

  res
    .status(200)
    .send(`OTP sent to number ${phonenumber} and your otp is ${otp}`);
};

module.exports = generateOTP;
