const express = require("express");
const passport = require("passport");
const { signin, signup } = require("./controllers");

const router = express.Router();


router.post("/signup", signup);

router.post(
  "/signin", passport.authenticate("local", { session: false }),
  signin);


module.exports = router;
