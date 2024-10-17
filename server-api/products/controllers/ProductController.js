const { initialise, createProduct, findProduct, updateProduct, findAllProducts, deleteProduct } = require("../../common/models/Product");
const { findAllCategories } = require("../../common/models/Category");


module.exports = {
    createProduct: async (req, res) => {
        const { name, description, price, image, categoryIds } = req.body;
        const priceUnit = req.body.priceUnit || "inr";
        try {
            const product = await createProduct({ name, description, image, price, priceUnit });

            if (categoryIds && categoryIds.length > 0) {
                console.log("ok")
                const categories = await findAllCategories({ id: categoryIds });
                console.log(categories)
                await product.addCategories(categories);
                const productWithCategories = await findProduct(product.id, { include: categories});
                console.log(this.Category)

                return res.status(201).json({
                    status: true,
                    data: productWithCategories.toJSON()
                });
            } else {
                console.log("NO Categories");
                return res.status(201).json({
                    status: true,
                    data: product.toJSON()
                });
            }
        } catch (error) {
            return res.status(400).json({
                status: false,
                error: error.message
            });
        }
    },
    getProducts: async (req, res) => {
        const { query: filters } = req;
        try {
            const products = await findAllProducts(filters);
            return res.status(200).json({
                status: true,
                data: products.map((product) => product.toJSON())
            });
        } catch (error) {
            return res.status(400).json({
                status: false,
                error: error.message
            });
        }
    },
    getProduct: async (req, res) => {
        const { id } = req.params;
        try {
            const product = await findProduct({ id });
            if (!product) {
                return res.status(404).json({
                    status: false,
                    error: "Product not found!"
                });
            }
            return res.status(200).json({
                status: true,
                data: product.toJSON()
            });
        } catch (error) {
            return res.status(400).json({
                status: false,
                error: error.message
            });
        }
    },
    updateProduct: async (req, res) => {
        const { id } = req.params;
        const payload = req.body;

        if (!Object.keys(payload).length) {
            return res.status(400).json({
                status: false,
                error: "Body is empty, hence cannot update the product."
            });
        }
        try {
            await updateProduct({ id }, payload);
            const updatedProduct = await findProduct({ id });
            return res.status(200).json({
                status: true,
                data: updatedProduct.toJSON()
            });
        } catch (error) {
            return res.status(400).json({
                status: false,
                error: error.message
            });
        }
    },
    deleteProduct: async (req, res) => {
        const { id } = req.params;
        try {
            await deleteProduct({ id });
            return res.status(200).json({
                status: true,
                data: "Product deleted successfully!"
            });
        } catch (error) {
            return res.status(400).json({
                status: false,
                error: error.message
            });
        }
    },
    
    getProductsByUserId: async (req, res) => {
        const authHeader = req.headers.authorization;
        console.log(authHeader)
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, jwtSecret);  
        // var userId = decoded.userId
        // console.log(userId)
    
        const { userId } = decoded;

        const filters  = {userId: userId}; // TODO : bridge table needed
        try {
            const products = await findAllProducts(filters);
            return res.status(200).json({
                status: true,
                data: products.map((product) => product.toJSON())
            });
        } catch (error) {
            return res.status(400).json({
                status: false,
                error: error.message
            });
        }   
    }
};
