const express = require('express')
const path = require('path');
const fs = require('fs');
//const jobsController = require('./../controllers/jobsController')

const router = express.Router()

router.route('/').get(async (req, res) => {
  jobsImgs = [...fs.readdirSync(path.join(__dirname, '../public/img/Jobs'))];
  jobsBgs = [...fs.readdirSync(path.join(__dirname, '../public/img/Jobs/BG'))];
  jobsFrames = [...fs.readdirSync(path.join(__dirname, '../public/img/Jobs/Frames'))];

  // jobsImgs = jobsImgs.map(img => {
  //   let ext = img.indexOf('.')
  //   return img.substring(0, ext)
  // })
  res
  .status(200)
  .json({
      status: 'success',
      data: {
        jobsImgs,
        jobsBgs,
        jobsFrames,
      }
  })
})

module.exports = router