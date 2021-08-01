const express = require("express");
const router = express.Router();
const { tripsfetch, createTrip } = require("./controllers");
const passport = require("passport");
const multer = require("multer");

// Fix the order of the routes so that trips list route is above create route

// ****************** TRIPS ROUTES ******************
router.get("/", tripsfetch);

// ****************** MULTER ******************
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });

// Middleware param isn't being used.
// ****************** MIDDLEWARE PARAM ******************
router.param("tripId", async (req, res, next, tripId) => {
  // Also... fetchBook?
  // I can tell you copied/pasted this block of code because it's easier.
  // Avoid doing this in the future, stay organized and delibrate with your code.
  const trip = await fetchBook(tripId, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    const error = new Error("Trip Not Found");
    error.status = 404;
    next(error);
  }
});

// ****************** CREATE TRIP ******************
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createTrip
);

module.exports = router;
