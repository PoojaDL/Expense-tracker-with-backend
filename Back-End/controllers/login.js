const User = require("../models/user");

exports.postLoginUser = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  User.create({
    name: name,
    email: email,
    password: password,
  })
    .then((result) => {
      console.log(res);
      return res.json(result);
    })
    .catch((err) => console.log(err));
};

exports.getLoginUser = (req, res, next) => {
  User.findAll()
    .then((result) => {
      console.log(res);
      return res.json(result);
    })
    .catch((err) => console.log(err));
};
