const express = require('express')
const deliveryRoute = require('./delivery.route')
const router = express.Router()

router.use('/v1/delivery', deliveryRoute)
module.exports = router