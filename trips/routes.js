const express = require("express");
const router = express.Router();

// ****************** CONTROLLERS IMPORT ******************
const {
  tripsfetch,
  createTrip,
  fetchTrips,
  deleteTrip,
  updateTrip,
} = require("./controllers");

// ****************** MIDDLEWARE IMPORT ******************
const passport = require("passport");

// ****************** MULTER IMPORT ******************
const multer = require("multer");

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

// ****************** MIDDLEWARE PARAM ******************
router.param("tripId", async (req, res, next, tripId) => {
  const trip = await fetchTrips(tripId, next);
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

router.delete("/:tripId", deleteTrip);

router.put(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  updateTrip
);

module.exports = router;
