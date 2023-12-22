const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const Expense = require("./models/expense");
const User = require("./models/user");

const app = express();
const sequelize = require("./util/database");
const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");

app.use(bodyParser.json({ extended: false }));
app.use(cors());
app.use("/auth", authRoutes);
app.use("/home", homeRoutes);

Expense.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Expense);

sequelize
  // .sync({ force: "true" })
  .sync()
  .then((res) => {
    // console.log(res);
    app.listen(3030);
  })
  .catch((err) => console.log(err));
