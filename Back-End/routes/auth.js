const express = require("express");

const authController = require("../controllers/auth");
const router = express.Router();

router.post("/", authController.postLoginUser);

// router.get("/", loginController.getLoginUser);

router.post("/signUp", authController.postSignUser);

module.exports = router;
