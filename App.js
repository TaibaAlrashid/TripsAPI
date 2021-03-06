const express = require("express");
const cors = require("cors");

const userRoutes = require("./API/user/routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoutes);

//Handeling errors//
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error." });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Path Not Found." });
});

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection successful");
    app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error(error);
  }
};
run();
