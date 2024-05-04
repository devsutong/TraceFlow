
const express = require("express");

const app = express();

app.use(express.json)

const PORT = process.env.PORT || 3000;

// Route Inports
const AuthorizationRoutes = require("");
const UserRotes = require("");
const ProductRoutes = require("");

//Sequealize model imports
const UserModel = require("");
const ProductModel = require("");

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT)
});

app.get("/status", () => {
    console.log("running!")
})