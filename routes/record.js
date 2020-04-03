const express = require("express");
const router = express.Router();
const controller = require("../controllers/records");

router.put("/update", controller.update);
router.get("/all", controller.all);

module.exports = router;
