const { Router } = require("express");
const GetUserData = require("../middleware/User/GetUserData");
const UpdateUserData = require("../middleware/User/UpdateUserData");

const router = Router();

/* "UpdateUserData" authenticates if the "User" owning the profile updates the profile */
router.post("/:email", UpdateUserData, GetUserData);

/* "FindUser" obtains the right "user" data using email as a unique token, and any (only) "User"
can view each other */
router.get("/:email", GetUserData);

module.exports = router;
