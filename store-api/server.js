const express = require("express");
const app = express();
const cors = require("cors"); // For Cross Origin Resource Sharing
// const Sequelize = require("sequelize"); // For ORM
const morgan = require("morgan"); // For logging
require('dotenv').config();


// const dbHost = process.env.DB_HOST;
// const dbUser = process.env.DB_USER;
// const dbPass = process.env.DB_PASS;
// const dbName = process.env.DB_NAME;

const { port } = require("./config");
const PORT = port || 3000;

// Route Imports
const AuthorizationRoutes = require("./authorization/routes");
const UserRoutes = require("./users/routes");
const ProductRoutes = require("./products/routes");
const UploadImageRoutes = require("./common/images/UploadImage");
const OrderRoutes = require("./order/routes");

//Sequelize model imports
// const User= require("./common/models/User");
// const Product = require("./common/models/Product");
// const Order = require("./common/models/Order")
const { User, Order, Product, OrderItem } = require('./common/models/associations');


app.use(morgan("tiny"));
app.use(cors());

app.use(express.json())
app.use('/uploads', express.static('uploads'));


app.get("/", (req, res) => {
    res.send("This is the root route!");
});


const sequelize= require("./common/models/SequelizeInstance");


// Syncing the models that are defined on sequelize with the tables that alredy exists
// in the database. It creates models as tables that do not exist in the DB.
// It also creates the tables if they do not exist.
sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialised!!");

    // Attaching the Authentication and User Routes to the app.
    app.use("/", AuthorizationRoutes);
    app.use("/user", UserRoutes);
    app.use("/product", ProductRoutes);
    app.use("/upload/image", UploadImageRoutes);
    app.use("/order", OrderRoutes);

    app.listen(PORT, '127.0.0.1', () => {
      console.log("Server Listening on PORT:", port);
    });
  })
  .catch((err) => {
    console.error("Sequelize Initialisation threw an error:", err);
  });
