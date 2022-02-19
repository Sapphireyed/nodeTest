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

module.exports = jobsLoc