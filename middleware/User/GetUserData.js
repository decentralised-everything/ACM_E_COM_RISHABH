const Users = require("../../models/Users");
const GetUser = async (req, res) => {
  //
  // using "email" as a token to find the user from the database since "email" is unique
  try {
    const user = await Users.findOne({ email: res.locals.user.email });
    res.json(user);
  } catch (error) {
    res.status(500).send(error); // gosh
  }
};

module.exports = GetUser;
