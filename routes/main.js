const express = require("express");

const mainController = require("../controllers/main");

const router = express.Router();
router.get("/", mainController.home);
router.get("/run", mainController.run)
router.get("/refresh", mainController.refresh)
router.get("/refresh-port", mainController.refresh_port)
router.post("/connect", mainController.connect)
module.exports = router;
