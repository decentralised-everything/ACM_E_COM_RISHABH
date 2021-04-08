const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

const app = express();

// middleware
app.use(express.static("public"));

// computer can't read object, goes bleep bloop, json helps computer go brrr
// thereafter, we can use these objects to authenticate or make dynamic frontend
app.use(express.json());

// view engine
app.set("view engine", "ejs");

// database connection link
const dbURI =
  "mongodb+srv://avgCoderr:123@rishabh.4a6ad.mongodb.net/RISHABHretryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//routes to different /pages and the defualt views.ejs each uses
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));

//instead of placing those routes here,
//connected using.use method
app.use(authRoutes);
