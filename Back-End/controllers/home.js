const Expense = require("../models/expense");
const User = require("../models/user");
const sequelize = require("../util/database");

exports.postExpenses = async (req, res, next) => {
  const t = await sequelize.transaction();
  Expense.create(
    {
      amount: req.body.amount,
      description: req.body.description,
      category: req.body.category,
      userId: req.user.id,
    },
    { transaction: t }
  )
    .then(() => {
      User.findByPk(req.user.id, { transaction: t })
        .then((user) => {
          user.totalExpense = user.totalExpense + +req.body.amount;
          return user.save({ transaction: t });
        })
        .then(async (result) => {
          await t.commit();
          return res.status(200).json({
            success: true,
            message: "Added expense successfully",
          });
        })
        .catch(async (err) => {
          await t.rollback();
          console.log(err);
        });
    })

    .catch(async (err) => {
      await t.rollback();
      console.log(err);
    });
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
  console.log(req.body.amount);
  Expense.findAll({ where: { userId: req.user.id, id: req.params.id } })
    .then((item) => {
      User.findByPk(req.user.id).then((user) => {
        user.totalExpense = user.totalExpense - +req.body.amount;
        return user.save();
      });
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
