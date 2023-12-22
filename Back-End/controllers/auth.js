const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.postSignUser = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confPassword = req.body.confPassword;

  if (password !== confPassword) {
    return res
      .status(404)
      .json({ success: false, message: "Password entered are wrong" });
  }
  let saltRounds = 10;
  User.findAll({ where: { email: email } })
    .then((user) => {
      if (user.length !== 0) {
        return res
          .status(404)
          .json({ success: false, message: "User already exist" });
      } else {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          User.create({
            name: name,
            email: email,
            password: hash,
          })
            .then((result) => {
              console.log(res);
              return res.status(200).json({
                success: true,
                message: "User Signed-In successfully",
              });
            })
            .catch((err) => console.log(err));
        });
      }
    })
    .catch((err) => console.log(err));
};

// exports.getLoginUser = (req, res, next) => {
//   User.findAll()
//     .then((result) => {
//       console.log(res);
//       return res.json(result);
//     })
//     .catch((err) => console.log(err));
// };

exports.postLoginUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findAll({ where: { email: email } }).then((user) => {
    if (user.length !== 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result === true) {
          return res.status(200).json({
            success: true,
            message: "User Login successfully",
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Enter the right Password",
          });
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });
    }
  });
};
