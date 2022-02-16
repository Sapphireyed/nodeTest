const express = require('express')
const viewsController = require('../controllers/viewsController')

const router = express.Router()

router.get('/jobs', viewsController.getJobs)

router.get('/jobs/:name', viewsController.getJob)

module.exports = router
