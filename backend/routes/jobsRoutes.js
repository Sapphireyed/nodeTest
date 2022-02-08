const express = require('express')
const jobsController = require('./../controllers/jobsController')

const router = express.Router()

router.route('/').get(jobsController.getAllJobs)
router.route('/').post(jobsController.createJob)
router.route('/:name').get(jobsController.getJob)

module.exports = router