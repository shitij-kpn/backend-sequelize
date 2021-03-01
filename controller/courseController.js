const { Course, Module } = require("../models");
const catchAsync = require("../utils/catchAsync");

exports.getAllCourses = catchAsync(async (req, res) => {
  const courses = await Course.findAll({ include: [Module] });

  if (!courses) {
    return res.send("there are no courses in the table");
  }
  res.status(200).json({
    status: "success",
    data: {
      courses,
    },
  });
});

exports.getCourse = catchAsync(async (req, res) => {
  const { course_id } = req.params;
  const course = await Course.findOne({
    where: { course_id },
    include: [Module],
  });
  if (course) {
    res.status(200).json({
      status: "success",
      data: {
        course,
      },
    });
  } else {
    res.send("this course does not exist");
  }
});

exports.checkout = catchAsync(async (req, res) => {
  console.log(res.user);
  const { course_id } = req.params;
  const course = await Course.findOne({
    where: { course_id },
    include: [Module],
  });
  if (course) {
    res.status(200).json({
      status: "success",
      data: {
        course,
      },
    });
  } else {
    res.send("checkout failed");
  }
});
