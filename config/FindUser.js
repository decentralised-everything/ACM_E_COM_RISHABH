const Users = require("../models/Users");
const FindUser = async (req, res) => {
  //
  // using "email" as a token to find the user from the database since "email" is unique
  const user = await Users.findOne({ email: res.locals.user.email });
  res.json(user);
};

module.exports = FindUser;
