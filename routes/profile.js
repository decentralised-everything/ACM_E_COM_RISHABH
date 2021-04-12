const { Router } = require("express");
const FindUser = require("../middleware/FindUser");
const UpdateUserData = require("../middleware/UpdateUserData");

const router = Router();

/* "UpdateUserData" authenticates if the "User" owning the profile updates the profile */
router.post("/:email", UpdateUserData, FindUser);

/* "FindUser" obtains the right "user" data using email as a unique token, and any (only) "User"
can view each other */
router.get("/:email", FindUser);

module.exports = router;
