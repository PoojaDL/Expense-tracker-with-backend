const Expense = require("../models/expense");

exports.postExpenses = (req, res, next) => {
  Expense.create({
    amount: req.body.amount,
    description: req.body.description,
    category: req.body.category,
    userId: req.user.id,
  })
    .then((result) => {
      return res.status(200).json({
        success: true,
        message: "Added expense successfully",
      });
    })
    .catch((err) => console.log(err));
};

exports.getAllExpenses = (req, res, next) => {
  let userId = req.user.id;
  Expense.findAll({ where: { userId: userId } })
    .then((result) => {
      return res.status(200).json({
        success: true,
        message: "fetched expenses successfully",
        data: result,
        isPremiumUser: req.user.isPremiumuser,
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteExpense = (req, res, next) => {
  Expense.findAll({ where: { userId: req.user.id, id: req.params.id } })
    .then((item) => {
      return item[0].destroy();
    })

    .then((result) => {
      return res.status(200).json({
        success: true,
        message: "Deleted expense successfully",
      });
    })
    .catch((err) => console.log(err));
};
