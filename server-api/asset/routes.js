const router = require('express').Router();
const AssetController = require("./controllers/AssetController")


router.post(
    "/verify",
    AssetController.verifyAsset
)

module.exports = router;
