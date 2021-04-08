const mongoose = require("mongoose");
const { isEmail } = require("validator");
//validator is a 3rd party validation package that does as name suggests

//database structure
const userSchema = new mongoose.Schema({
  email: {
    type: String, //string for database, user input
    required: [true, "Please enter an Email"], //required for database, user input
    unique: true, //unique for database
    lowercase: true, //lowercase for database
    validate: [isEmail, "Please enter a valid email"], //checking if email is correct
  },
  password: {
    type: String, //string for database, user input
    required: [true, "Please enter a password"], //required field
    minlength: [6, "Minimum password length is 6 characters"], //minimum length of password
  },
});

/*the model name that we provide here must be
singular form of name of database collection which 
in our case is "users"
*/

const User = mongoose.model("user", userSchema);

module.exports = User;
