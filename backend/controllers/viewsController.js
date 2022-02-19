const Job = require('../models/jobModel')
const Ability = require('../models/abilityModel')
const APIFeatures = require('./../utils/apiFeatures')

exports.getJobs = async (req, res)=> {
  try {
  let lang = req.params.lang
  const features = new APIFeatures(Job.find(), req.query)
  .filter()
  .sort()
  .limit()
  .paginate()

  let jobs = await features.query
  // 2) build template

  // 3) render te,plate using data from step 1
  res.status(200).render('jobs', {
    title: 'JOBS',
    jobs,
    lang
  })
  } catch (err) {
    console.log('err', err)
  }
}

exports.getJob = async (req, res)=> {
  try {
    let job = await Job.find()
    console.log('job', job, req.params.name)
    job = job[0]

   // let sSkill = await Ability.find({_id: job.switch_skill_id})   // other way of getting abilities
    console.log('job', job)

    res.status(200).render(`job`, {
      title: job.job,
      job
    })
  } catch (err) {
    console.log('err', err)

  }

}