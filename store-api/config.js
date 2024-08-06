module.exports = {
    port: 3000,
    jwtExpirationInSeconds: 60 * 60 * 60,
    roles: {
        USER: 'user',
        ADMIN: 'admin',
        SELLER: 'seller'
    },
    productPriceUnits: {
        INR: 'inr'
    }
}