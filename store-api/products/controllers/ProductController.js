import { ProductModel } from '../common/models/Product';

module.exports = {
    createProduct: (req, res) => {
        const payload = req.body;
        ProductModel.createProduct(payload)
        .then((product) => {
            return res.status(201).json({
                status: true,
                data: product.toJSON()
            });
        })
        .catch((error) => {
            return res.status(400).json({
                status: false,
                error: error.message
            });
        });
    },
    getProducts: (req, res) => {
        ProductModel.findAllProducts()
        .then((products) => {
            return res.status(200).json({
                status: true,
                data: products.map((product) => product.toJSON())
            });
        })
        .catch((error) => {
            return res.status(400).json({
                status: false,
                error: error.message
            });
        });
    },
    getProduct: (req, res) => {
        const { id } = req.params;
        ProductModel.findProduct({ id })
        .then((product) => {
            if(!product) {
                return res.status(404).json({
                    status: false,
                    error: "Product not found!"
                });
            }
            return res.status(200).json({
                status: true,
                data: product.toJSON()
            });
        })
        .catch((error) => {
            return res.status(400).json({
                status: false,
                error: error.message
            });
        });
    },
    updateProduct: (req, res) => {
        const { id } = req.params;
        const payload = req.body;
        
        if (!Object.keys(payload).length) {
            return res.status(400).json({
                status: false,
                error: "Body is empty, hence can not update the product."
            });
        }
        ProductModel.updateProduct({ id }, payload)
        .then((product) => {
            return res.status(200).json({
                status: true,
                data: product.toJSON()
            });
        })
        .catch((error) => {
            return res.status(400).json({
                status: false,
                error: error.message
            });
        });
    },
    deleteProduct: (req, res) => {
        const { id } = req.params;
        ProductModel.deleteProduct({ id })
        .then(() => {
            return res.status(200).json({
                status: true,
                data: "Product deleted successfully!"
            });
        })
        .catch((error) => {
            return res.status(400).json({
                status: false,
                error: error.message
            });
        });
    }
};