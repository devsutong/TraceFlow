const express = require("express");
const app = express();
const cors = require("cors"); // For Cross-Origin Resource Sharing
const Sequelize = require("sequelize"); // For ORM
const morgan = require("morgan"); // For logging
require('dotenv').config();

const { port } = require("./config");
const PORT = port || 3000;

// Route Imports
const AuthorizationRoutes = require("./authorization/routes");
const UserRoutes = require("./users/routes");
const ProductRoutes = require("./products/routes");

// Sequelize model imports
const UserModel = require("./common/models/User");
const ProductModel = require("./common/models/Product");

// Initialize Sequelize with MySQL configuration
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: console.log, // Optional: log SQL queries
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// Initialize the Models on Sequelize
UserModel.initialise(sequelize);
ProductModel.initialise(sequelize); // Assuming you have similar setup for ProductModel

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("This is the root route!");
});

app.get("/status", (req, res) => {
    res.send("Status: OK!");
});

// Syncing the models that are defined on Sequelize with the tables that already exist
sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialized!");

    // Attaching the Authentication and User Routes to the app
    app.use("/", AuthorizationRoutes);
    app.use("/user", UserRoutes);
    app.use("/product", ProductRoutes);

    app.listen(PORT, () => {
      console.log("Server Listening on PORT:", PORT);
    });
  })
  .catch((err) => {
    console.error("Sequelize Initialization threw an error:", err);
  });
