const express = require("express");

const homeController = require("../controllers/home");
const router = express.Router();

router.post("/", homeController.postExpenses);

router.get("/", homeController.getAllExpenses);

router.get("/:id", homeController.deleteExpense);

module.exports = router;
