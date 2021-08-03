const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const db = require("./db/models");

// ****************** MIDDLEWARE  IMPORT ******************
const passport = require("passport");
const { localStrategy } = require("./API/middleware/passport");
const { jwtStrategy } = require("./API/middleware/passport");

// ****************** ROUTES IMPORT ******************
const userRoutes = require("./API/user/routes");
const triproutes = require("./trips/routes");

// Request ----> Middleware ------> Next() ------> Router/Controller
//         <-------------------------------------- Response
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// ****************** ROUTES ******************
app.use("/trips", triproutes);
app.use(userRoutes);
app.use("/media", express.static("media"));

// ****************** Handling Errors ******************
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error." });
});

// ****************** Handling No found Path ******************
app.use((req, res, next) => {
  res.status(404).json({ message: "Path Not Found." });
});

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
    await app.listen(9000, () => {
      console.log("The application is running on localhost:9000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};
run();
