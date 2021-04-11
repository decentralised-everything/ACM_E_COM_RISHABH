const Users = require("../models/Users");

// profile update, authentication token being email in this case since its unique and criteria of login as well
// implement authorization middleware for redirection and on each subsequent credential pages
const UpdateUserData = async (req, res) => {
  const { email } = req.params;

  if (email === res.locals.user.name) {
    await Users.findOneAndUpdate({ email: email }, {});
  } else {
    res.send("Only User of this profile can update");
    res.end();
  }
};

module.exports = UpdateUserData;
