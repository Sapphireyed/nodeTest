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
  keys: String,
  english: String,
  chinese: String,
  chinese_trad: String,
  russian: String,
  portuguese: String,
  spanish: String,
  french: String,
  japanese: String,
  arabic: String,
  dutch: String
})

const descrLoc = mongoose.model('descrLoc', descrLocSchema, 'descrLoc')

module.exports = { JobLoc, descrLoc }