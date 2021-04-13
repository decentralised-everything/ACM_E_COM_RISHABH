const Users = require("../../models/Users");

// profile update, authentication token being email in this case since its unique and criteria of login as well
// implement authorization middleware for redirection and on each subsequent credential pages
const UpdateUserData = async (req, res) => {
  const { email } = req.params;

  if (email === res.locals.user.name) {
    try {
      await Users.findOneAndUpdate({ email: email }, {});
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.send(`Only ${email} can update`);
    res.end();
  }
};

module.exports = UpdateUserData;
