const express = require("express");
const app = express();
const cors = require("cors"); // For Cross Origin Resource Sharing
const Sequelize = require("sequelize"); // For ORM
const morgan = require("morgan"); // For logging

const { port } = require("./config");
const PORT = port || 3000;

app.use(express.json())

// Route Inports
const AuthorizationRoutes = require("./authorization/routes").default;
// const UserRoutes = require("");
// const ProductRoutes = require("");

//Sequelize model imports
const UserModel = require("./common/models/User");
// const ProductModel = require("./common/models/ProductModel");

app.get("/", (req, res) => {
    res.send("This is the root route!");
});

app.get("/status", (req, res) => {
    res.send("Status: OK!");
});


const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./storage/data.db", // Path to the file that will store the SQLite DB.
  });


// Initialising the Model on sequelize
UserModel.initialise(sequelize);


// Syncing the models that are defined on sequelize with the tables that alredy exists
// in the database. It creates models as tables that do not exist in the DB.
// It also creates the tables if they do not exist.
sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialised!!");

    // Attaching the Authentication and User Routes to the app.
    app.use("/", AuthorizationRoutes);

    app.listen(PORT, () => {
      console.log("Server Listening on PORT:", port);
    });
  })
  .catch((err) => {
    console.error("Sequelize Initialisation threw an error:", err);
  });

