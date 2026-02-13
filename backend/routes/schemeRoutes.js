const express = require("express");
const router = express.Router();
const {
  getSchemes,
  addScheme,
  matchSchemes
} = require("../controllers/schemeController");

router.get("/", getSchemes);
router.post("/", addScheme);
router.post("/match", matchSchemes);

module.exports = router;
