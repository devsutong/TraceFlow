
const express = require("express");

const app = express();
const config = require("./config");
app.use(express.json)

const PORT = config.port || 3000;

// Route Inports
const AuthorizationRoutes = require("./authorization/routes");
// const UserRoutes = require("");
// const ProductRoutes = require("");

//Sequelize model imports
const UserModel = require("./common/models/User");
// const ProductModel = require("./common/models/ProductModel");

app.listen(PORT, '0.0.0.0', () => {
    console.log("Server Listening on PORT:", PORT)
});


app.use("/", AuthorizationRoutes);

app.get("/", (req, res) => {
    console.log("running!")
    res.send("Hello");
});

app.get("/status", () => {
    console.log("running!")
});