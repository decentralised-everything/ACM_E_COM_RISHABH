const Users = require("../../models/Users");
const GetUserData = async (req, res, next) => {
  //
  // using email as a criteria to find user (since its unique to each user)
  const { email } = req.params;
  await Users.findOne({ email: email }, (err, userData) => {
    if (err) {
      return res.status(403).send(err);
      // either the data was corrupted or name entered didn't exist (or idk)
    } else {
      // "json stuff" to remove specific data extracted from database that shouldn't be displayed
      delete userData.password;
      delete userData._id;

      // displaying user (data) without "id" and "password"
      res.json(userData);
      next();
    }
  });
};

module.exports = GetUserData;
