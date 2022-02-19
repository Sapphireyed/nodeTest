const express = require('express')
const JobLoc = require('../models/locModels');

const router = express.Router()

const getAllLocalized = async (req, res) => {
  try {
    let jobsLoc = await JobLoc.find()
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
}

router.route('/').get(getAllLocalized)

module.exports = router