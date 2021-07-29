const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db/models");

// ****************** ROUTES IMPORT ****************** 
const triproutes = require("./trips/routes");

app.use(cors());
app.use(bodyParser.json());

// ****************** ROUTES ****************** 
app.use("/trips", triproutes);
app.use("/media", express.static("media"));

// ****************** Handling No found Path ******************
app.use((req, res, next) => {

    res.status(404).json({ message: "Path not found " });
});

// ****************** Handling Errors ******************

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(err.status || 500).json({ message: err.message || "Enternal Server Error." });
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
