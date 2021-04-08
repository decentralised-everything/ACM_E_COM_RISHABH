const User = require("../models/Users");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  //defining errors for objects
  let errors = { email: "", password: "" };

  //duplicate errors
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  //asking for credentials, storing as objects, destructured

  try {
    const user = await User.create({ email, password });
    //await cause we want each process of storage to be done
    res.status(201).json(user);
  } catch (err) {
    //function to send the error we provided side by side as a object
    const errors = handleErrors(err);
    res.status(400).json({ errors }); //sending the same error object as json
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  //asking for credentials, storing as objects, destructured

  console.log(email, password);
  res.send("user login");
};
