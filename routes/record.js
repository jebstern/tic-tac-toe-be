const express = require("express");
const router = express.Router();
const controller = require("../controllers/records");

router.put("/update", controller.update);

module.exports = router;
