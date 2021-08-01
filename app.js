/**
 * GENERAL NOTES
 *
 * You have `app.js` and `App.js`. Check the repo on GitHub to see. Delete `App.js`.
 *
 * Use Prettier to auto-format your code.
 */

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const db = require("./db/models");

// ****************** ROUTES IMPORT ******************
const userRoutes = require("./API/user/routes");
// trips folder should be moved into API/
const triproutes = require("./trips/routes");

app.use(cors());
app.use(bodyParser.json());

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
