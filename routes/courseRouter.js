const express = require("express");
const router = express.Router();

const { getAllCourses, getCourse } = require("../controller/courseController");

router.route("/").get(getAllCourses);
router.route("/:course_id").get(getCourse);

module.exports = router;
