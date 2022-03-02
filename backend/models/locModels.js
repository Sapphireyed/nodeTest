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

const JobLoc = mongoose.model('jobsLoc', jobLocSchema, 'jobsLoc')

const descrLocSchema = mongoose.Schema({
  Keys: String,
  English: String,
  Chinese: String,
  Chinese_trad: String,
  Russian: String,
  Portuguese: String,
  Spanish: String,
  French: String,
  Japanese: String,
  Arabic: String,
  Dutch: String
})

const descrLoc = mongoose.model('descrLoc', descrLocSchema, 'descrLoc')

module.exports = { JobLoc, descrLoc }