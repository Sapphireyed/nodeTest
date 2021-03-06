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
  let abilities = await Ability.find()
  // 2) build template

  // 3) render te,plate using data from step 1
  res.status(200).render('jobs', {
    title: 'JOBS',
    jobs,
    abilities,
    lang
  })
  } catch (err) {
    console.log('err', err)
  }
}

exports.getJob = async (req, res)=> {
  try {
    let job = await Job.find()
    job = job[0]

   // let sSkill = await Ability.find({_id: job.switch_skill_id})   // other way of getting abilities

    res.status(200).render(`job`, {
      title: job.job,
      job
    })
  } catch (err) {
    console.log('err', err)

  }

}