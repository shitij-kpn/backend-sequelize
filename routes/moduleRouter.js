const express = require("express");
const router = express.Router();

const {
  getAllModules,
  getModule,
  getAllModulesFromCourse,
} = require("../controller/moduleController");

router.route("/").get(getAllModules);
router.route("/course:id/").get(getAllModulesFromCourse);
router.route("/:sno").get(getModule);

module.exports = router;
