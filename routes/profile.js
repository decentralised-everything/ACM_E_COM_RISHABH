const { Router } = require("express");
const User = require("../models/Users");

const router = Router();

router.post("/:email", async (req, res) => {
  const { email } = req.params;
  const user = req.user;
  if (email === req.user.email) {
  }
  res.json(user);
});

router.get("/:email", async (req, res) => {
  const { email } = req.params;
  const user = users.find((user) => (user.email = email));

  res.json(user);
});

module.exports = router;
