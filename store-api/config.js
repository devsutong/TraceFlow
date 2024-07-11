module.exports = {
    port: 3001,
    jwtSecret: 'pass',
    jwtExpirationInSeconds: 60 * 60,
    roles: {
        USER: 'user',
        ADMIN: 'admin'
    },
    productPriceUnits: {
        INR: 'inr'
    }
}