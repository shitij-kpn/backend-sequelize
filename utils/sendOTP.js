const axios = require("axios");

const sendOTP = async ({ otp, phonenumber }) => {
  const apistring = `http://api.msg91.com/api/v2/sendsms?authkey=${
    process.env.AUTH_KEY
  }&mobiles=${phonenumber}&message=${
    "Your otp is" + otp
  }&sender=MSGIND&route=4&country=91`;
  try {
    const response = await axios.get(apistring);
    console.log("OTP sent");
  } catch (error) {
    throw error;
  }
};

module.exports = sendOTP;
