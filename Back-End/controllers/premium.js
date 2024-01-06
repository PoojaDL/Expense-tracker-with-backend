const User = require("../models/user");
const Expense = require("../models/expense");
const sequelize = require("sequelize");

exports.getLeaderBoard = async (req, res, next) => {
  try {
    const leaderBoard = await User.findAll({
      attributes: [
        "id",
        "name",
        [sequelize.fn("sum", sequelize.col("amount")), "total_amount"],
      ],
      include: [
        {
          model: Expense,
          attributes: [],
        },
      ],
      group: ["users.id"],
      order: [["total_amount", "DESC"]],
    });

    res.status(200).json(leaderBoard);
  } catch (err) {
    console.log(err);
  }
};
