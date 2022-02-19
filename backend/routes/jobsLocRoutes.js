const express = require('express')
const JobLoc = require('./../models/jobsLocModel');

const router = express.Router()

router.route('/').get(async (req, res) => {
  try {
    let jobsLoc = await JobLoc.find()
    console.log('JobLoc',  jobsLoc)
    res
    .status(200)
    .json({
        status: 'success',
        data: {
          jobsLoc
        }
    })
  } catch (err) {
    res.status(404)
    .json({
        status: 'fail',
        messege: 'err: ' + err
    })
  }

})

module.exports = router