const router = require('express').Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");


// Controller Imports
const ProductController = require("./controllers/ProductController");

// Schema Imports
const createProductPayload = require("./schemas/createProductPayload");
const updateProductPayload = require("./schemas/updateProductPayload");
const { roles } = require('../config');

router.get(
    "/",
    isAuthenticatedMiddleware,
    ProductController.getProducts
)

router.get(
    "/:id",
    isAuthenticatedMiddleware,
    ProductController.getProduct
)

router.post(
    "/",
    isAuthenticatedMiddleware,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware(createProductPayload),
    ProductController.createProduct
)

router.patch(
    "/:id",
    isAuthenticatedMiddleware,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware(updateProductPayload),
    ProductController.updateProduct
)

router.delete(
    "/:id",
    isAuthenticatedMiddleware,
    CheckPermissionMiddleware.has(roles.ADMIN),
    ProductController.deleteProduct
)

module.exports = router;