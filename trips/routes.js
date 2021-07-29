const express = require("express");
const router = express.Router();
const { tripsfetch, createTrip } = require("./controllers");
const passport = require("passport");
const multer = require("multer");


// ****************** TRIPS ROUTES ******************
router.get("/", tripsfetch);


// ****************** MULTER ******************
const storage = multer.diskStorage({
    destination: "./media",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
});
const upload = multer({ storage });


// ****************** MIDDLEWARE PARAM ******************
router.param("tripId", async (req, res, next, tripId) => {
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
router.post("/", passport.authenticate("jwt", { session: false }), upload.single("image"), createTrip);



module.exports = router;