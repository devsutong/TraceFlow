const { getFullProductDetails } = require("../../services/productService");

module.exports = {
    verifyAsset: async (req, res) => {
        try {
            const { asset_id } = req.body;

            if (!asset_id) {
                return res.status(400).json({
                    message: 'asset_id is required'
                });
            }

            // You must decide who is calling this
            // For now, assume it as an admin
            //since any user can check the product history is they have the qr code
            const PUBLIC_USER_ID = 'temp';

            const product = await getFullProductDetails(
                asset_id,
                PUBLIC_USER_ID
            );

            const timeline = (product.traceabilityHistory || []).map(h => ({
                stage: h.action || 'UNKNOWN',
                location: h.location || product.owner || 'UNKNOWN',
                timestamp: h.timestamp
            }));

            return res.status(200).json({
                assetId: asset_id,
                isAuthentic: true,
                productName: product.name,
                timeline
            });

        } catch (error) {
            console.error('VERIFY ASSET FAILED:', error.message);

            return res.status(200).json({
                assetId: req.body.asset_id || 'UNKNOWN-ASSET',
                isAuthentic: false,
                timeline: []
            });
        }
    }
};
