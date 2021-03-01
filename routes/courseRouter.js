const express = require("express");
const router = express.Router();

const {
  getAllCourses,
  getCourse,
  checkout,
} = require("../controller/courseController");

const { checkToken } = require("../controller/authController");

router.route("/").get(getAllCourses);
router.route("/:course_id").get(getCourse);
router.route("/checkout/:course_id").post(checkToken, checkout);

module.exports = router;
