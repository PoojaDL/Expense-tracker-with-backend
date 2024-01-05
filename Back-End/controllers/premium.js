const User = require("../models/user");
const Expense = require("../models/expense");
const sequelize = require("sequelize");

exports.getLeaderBoard = (req, res, next) => {
  let arr1 = [];
  Expense.findAll({
    attributes: [
      "userId",
      [sequelize.fn("sum", sequelize.col("amount")), "total_amount"],
    ],
    group: ["userId"],
    raw: true,
  })
    .then((result) => {
      console.log("result", result);
      const promise1 = result.map((data) => {
        return User.findByPk(data.userId)
          .then((user) => {
            return new Promise((resolve, reject) => {
              resolve({ ...data, name: user.name });
            });
          })
          .catch((err) => console.log(err));
      });
      // console.log(promise1);
      // return promise1;
      Promise.all(promise1).then((result) => {
        res.json(result);
      });
    })
    .catch((err) => console.log(err));
};
