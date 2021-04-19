const Users = require("../../models/Users");

const GetUserData = async (req, res, next) => {
  const { name } = req.params;

  Users.findOne({ name: name }, (err, user) => {
    if (err) return res.status(403).send(err);
    else {
      user = JSON.parse(JSON.stringify(user));

      delete user._id;
      delete user.password;

      res.send(user);
      next();
    }
  });
};

module.exports = GetUserData;
