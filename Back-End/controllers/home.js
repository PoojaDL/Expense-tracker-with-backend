const Expense = require("../models/expense");
const User = require("../models/user");

exports.postExpenses = (req, res, next) => {
  const emailToFind = req.body.email;
  let userId;
  User.findAll({ where: { email: emailToFind } })
    .then((result) => {
      userId = result[0].dataValues.id;
      Expense.create({
        amount: req.body.data.amount,
        description: req.body.data.description,
        category: req.body.data.category,
        userId: userId,
      })
        .then((result) => {
          // console.log(result);
          return res.status(200).json({
            success: true,
            message: "Added expense successfully",
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAllExpenses = (req, res, next) => {
  const emailToFind = req.query.email;
  let userId;
  User.findAll({ where: { email: emailToFind } })
    .then((result) => {
      userId = result[0].dataValues.id;
      Expense.findAll({ where: { userId: userId } })
        .then((result) => {
          // console.log(result);
          return res.status(200).json({
            success: true,
            message: "Added expense successfully",
            data: result,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteExpense = (req, res, next) => {
  // const itemId=req.params.id;
  Expense.findByPk(req.params.id)
    .then((item) => {
      return item.destroy();
    })
    .then((result) => {
      return res.status(200).json({
        success: true,
        message: "Deleted expense successfully",
      });
    })
    .catch((err) => console.log(err));
};
