const rabbitAMQPConnection = require('../rabbitAMQP/connection')
module.exports.userController = {
    createUser: async (req, res, next) => {
        const user = { id: 1, name: "name", address: "address", phone: "phone" }
        console.log("user")
        return rabbitAMQPConnection.producerConnection('user_create', user);
    },
    getUsers: async () => {

    },
    getUser: async () => {

    },
    deleteUser: async () => {

    },
    updateUser: async () => {

    }
}
