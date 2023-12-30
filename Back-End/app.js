const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const Expense = require("./models/expense");
const User = require("./models/user");

const app = express();
const sequelize = require("./util/database");
const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");
const paymentRoutes = require("./routes/payment");
const Order = require("./models/orders");

app.use(bodyParser.json({ extended: false }));
app.use(cors());
app.use("/auth", authRoutes);
app.use("/home", homeRoutes);
app.use("/purchase", paymentRoutes);

Expense.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Expense);

Order.belongsTo(User);
User.hasMany(Order);

sequelize
  // .sync({ force: "true" })
  .sync()
  .then((res) => {
    // console.log(res);
    app.listen(3030);
  })
  .catch((err) => console.log(err));
