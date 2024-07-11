const UserModel = require("../../common/models/User");

module.exports = {
    getUser: (req, res) => {
        const {
            user: { userId }
        } = req;

        UserModel.findUser({ id: userId })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({
                        status: false,
                        error: 'User not found!'
                    });
                }
                return res.status(200).json({
                    status: true,
                    data: user.toJSON()
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    status: false,
                    error: error.message
                });
            });
    },

    updateUser: (req, res) => {
        const {
            user: { userId },
            body: payload,  // const payload = req.body
        } = req;

        if (!Object.keys(payload).length) {
            return res.status(400).json({
              status: false,
              error: {
                message: "Body is empty, hence can not update the user.",
              },
            });
        }

        UserModel.updateUser({ id: userId}, payload)
            .then((user) => {
                return res.status(200).json({
                    status: true,
                    data: user.toJSON()
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    status: false,
                    error: error.message
                });
            });
    },

    deleteUser: (req, res) => {
        const {
            user: { userId }
        } = req;

        UserModel.deleteUser({ id: userId })
            .then(() => {
                return res.status(200).json({
                    status: true,
                    message: 'User deleted successfully!'
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    status: false,
                    error: error.message
                });
            });
    },


    

    getUsers: (req, res) => {
        UserModel.findAllUsers(req.query)
            .then((users) => {
                return res.status(200).json({
                    status: true,
                    data: users.map((user) => user.toJSON())
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    status: false,
                    error: error.message
                });
            });
    },

    changeRole: (req, res) => {
        const {
            user: { userId },
            body: { role }
        } = req;

        UserModel.updateUser({ id: userId }, { role })
            .then((user) => {
                return res.status(200).json({
                    status: true,
                    data: user.toJSON()
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    status: false,
                    error: error.message
                });
            });
    }
}