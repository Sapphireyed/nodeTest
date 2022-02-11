const Job = require('../models/jobModel')


exports.getJobs = async (req, res)=> {
  try {
  // 1) get data from collection
  const jobs = await Job.find()
  // 2) build template

  // 3) render te,plate using data from step 1
  res.status(200).render('jobs', {
    title: 'JOBS'
  })
  } catch (err) {
    console.log('err', err)
  }
}

exports.getJob = (req, res)=> {
  res.status(200).render('job', {
    title: 'JOB'
  })
}