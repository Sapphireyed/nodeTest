const express = require('express')
const jobsController = require('./../controllers/jobsController')

const router = express.Router()

router.route('/')
        .get(jobsController.getAllJobs)
        .post(jobsController.createJob)

router.route('/search/:filterBy').get(jobsController.getFiltered)
router.route('/:name').get(jobsController.getJob)

module.exports = router