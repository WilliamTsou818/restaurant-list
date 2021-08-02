const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const sortData = require('../../config/sortData.json')

router.get('/', (req, res) => {
  return Restaurant.find({ userId: req.user._id })
    .lean()
    .then((restaurants) => res.render('index', { restaurants, sortData }))
    .catch((error) => console.error(error))
})

module.exports = router
