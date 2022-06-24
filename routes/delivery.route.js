const express = require('express')
const { getBetterRoute } = require('../libs/delivery.lib')
const api = express.Router()
api.route('/searchRoute').post((req, res, next) => {
  const model = req.body
  const data = getBetterRoute(model)
  return res.status(404).send(data)
})
module.exports = api