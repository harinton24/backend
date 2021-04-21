const db = require("../models");

const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
 
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Error, El Username esta en Uso!" });
      return;
    }

    
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Error, Email esta en uso, intenta con otro!" });
        return;
      }

      next();
    });
  });
};



const verifySignUp = {
  checkDuplicateUsernameOrEmail,

};

module.exports = verifySignUp;
