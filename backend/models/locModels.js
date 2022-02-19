const mongoose = require('mongoose')

const jobLocSchema = mongoose.Schema({
    Key: String,
    English: String,
    Chinese: String,
    Russian: String,
    Portuguese: String,
    Spanish: String,
    French: String,
    Japanese: String,
    Arabic: String,
})

const jobsLoc = mongoose.model('jobsLoc', jobLocSchema, 'jobsLoc')

const descrLocSchema = mongoose.Schema({
  Key: String,
  English: String,
  Chinese: String,
  Russian: String,
  Portuguese: String,
  Spanish: String,
  French: String,
  Japanese: String,
  Arabic: String,
})

const descrLoc = mongoose.model('descrLoc', descrLocSchema, 'descrLoc')

module.exports = { jobsLoc, descrLoc }