const express = require('express')
const viewsController = require('../controllers/viewsController')

const router = express.Router()

router.route('/jobs').get(viewsController.getJobs)

router.get('/job', viewsController.getJob)

module.exports = router
