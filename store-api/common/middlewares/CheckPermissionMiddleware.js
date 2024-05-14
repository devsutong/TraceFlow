const UserModel = require("./common/models/User");

module.exports = {
    has: (role) => {
        return (req, res, next) => {
            const {
                user: {userId},
            } = req;

            UserModel.findUser({id: userId})
            .then((user) => {
                if(user.role === role) {
                    return next();
                }
                return res.status(403).json({
                    status: false,
                    error: "Forbidden"
                });
            })
        }
    }
}