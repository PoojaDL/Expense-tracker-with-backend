const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const sequelize = require("./util/database");
const authRoutes = require("./routes/auth");

app.use(bodyParser.json({ extended: false }));
app.use(cors());
app.use("/auth", authRoutes);

sequelize
  // .sync({ force: "true" })
  .sync()
  .then((res) => {
    // console.log(res);
    app.listen(3030);
  })
  .catch((err) => console.log(err));
