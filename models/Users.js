const mongoose = require("mongoose");
const { isEmail } = require("validator");
//validator is a 3rd party validation package that does as name suggests
const bcrypt = require("bcrypt");

//database structure
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an Email"],
    unique: true, // checks is email is unique to database
    lowercase: true, // storing in lowercase
    validate: [isEmail, "Please enter a valid email"], //to check if existing email
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

// "pre" method, fires the function before saving to DB
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(); // genSalt is async method, mention async explicitely
  // "this" refers to the current user being created
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login
userSchema.statics.login = async function (email, password) {
  // find that one valid email for login
  const user = await this.findOne({ email });
  if (user) {
    // converting input password into hash and comparing with database
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Email");
};

/*the model name that we provide here must be
singular form of name of database collection which 
in our case is "users"
*/
const User = mongoose.model("user", userSchema);

module.exports = User;
