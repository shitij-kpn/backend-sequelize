require("dotenv").config({ path: "./config.env" });
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const { sequelize, PhoneNumbers, OTP } = require("./models");
const generateOTP = require("./utils/generateOTP");
const sendOTP = require("./utils/sendOTP");

const app = express();

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.post("/register", async (req, res) => {
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
      res.send(`OTP sent to number ${number} and your otp is ${otp}`);
    } else {
      res.send(`This number already exists`);
    }
  } catch (error) {
    res.json(error);
  }
});

app.post("/verify", async (req, res) => {
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
    return res.json(error);
  }
});

app.listen(5000, async () => {
  console.log("Running on port 5000");
  await sequelize.authenticate();
  console.log("database connected");
});
