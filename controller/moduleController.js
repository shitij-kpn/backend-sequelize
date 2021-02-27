const { Module } = require("../models");
const catchAsync = require("../utils/catchAsync");

exports.getAllModules = catchAsync(async (req, res) => {
  const modules = await Module.findAll();

  if (!modules) {
    return res.send("there are no modules in the table");
  }
  res.status(200).json({
    status: "success",
    data: {
      modules,
    },
  });
});

exports.getModule = catchAsync(async (req, res) => {
  const { sno } = req.params;
  const module = await Course.findOne({
    where: { sno },
  });
  if (module) {
    res.status(200).json({
      status: "success",
      data: {
        module,
      },
    });
  } else {
    res.send("this module does not exist");
  }
});

exports.getModuleFromCourse = catchAsync(async (req, res) => {
  const { course_id } = req.params;
  const module = await Course.finAll({
    where: { course_id },
  });
  if (module) {
    res.status(200).json({
      status: "success",
      data: {
        module,
      },
    });
  } else {
    res.send("this module does not exist");
  }
});
