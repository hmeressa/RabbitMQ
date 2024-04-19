
const express = require('express');
const route = express.Router();
const userController = require('../controller')
route.route("/")
    .post(userController.userController.userController.createUser)
    .get(userController.userController.getUsers)