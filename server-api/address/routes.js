const express = require("express");
const AddressController = require("./controllers/AddressController");

const router = express.Router();

// Create a new address
router.post("/", AddressController.createAddress);

// Get a single address
router.get("/", AddressController.getAddresses);

// Get all addresses
// router.get("/addresses/all", AddressController.getAll);

// Update an address
router.put("/", AddressController.updateAddress);

// Delete an address
router.delete("/", AddressController.deleteAddress);

module.exports = router;
