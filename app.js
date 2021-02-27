require("dotenv").config({ path: "./config.env" });
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const { sequelize } = require("./models");

const otpRouter = require("./routes/otpRouter");
const courseRouter = require("./routes/courseRoutes");

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

app.use("/api/v1/otp", otpRouter);

app.use("/api/v1/courses", courseRouter);

app.all("*", (req, res) => {
  res.status(404).send("404");
});

app.listen(5000, async () => {
  console.log("Running on port 5000");
  await sequelize.authenticate();
  console.log("database connected");
});
