const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config");

module.exports = { 
    check: (req, res, next) => {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401)
            .json({
                "status": false, 
                "error": {
                    "message": "Either unauthorized or invalid machanism!"
                }
            });
        }

        const token = authHeader.split(" ")[1];

        if(!token){
            return res.status(401)
            .json({
                "status": false, 
                "error": {
                    "message": "Token not found!"
                }
            });
        }

        jwt.verify(token, jwtSecret, (err, user) => {
            if(err) {
                return res.status(403)
                .json({
                    "status": false, 
                    "error": {
                        "message": "Invalid Token! Please login again."
                    }
                });
            }

            req.user = user;
            next();
        });

    }
}
