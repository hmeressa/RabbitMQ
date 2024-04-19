const userRoute = require('./user.route');
const express = require('express');
const router = express.Router();
const routeCollections =
    [
        {
            path: "/user",
            route: userRoute
        },
    ];

routeCollections.map(route => {
    router.use(route.path, route.route);
});

module.exports = router;