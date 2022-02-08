const Job = require('./../models/jobModel');
const APIFeatures = require('./../utils/apiFeatures')

// const abils5 = abilities.find(ab => ab['Ability Name'] == j['5 Abilities'])
// const abils3 = abilities.find(ab => ab['Ability Name'] == j['3 Abilities'])
// const abils2 = abilities.find(ab => ab['Ability Name'] == j['2 Abilities'])
// const abils1 = abilities.find(ab => ab['Ability Name'] == j['1 Abilities'])
// const sSkill = abilities.find(ab => ab['Ability Name'] == j['Switch Skill'])
// //try updateMany to convert names to ids...
// let job = ({...j._doc, 
//     '5 Abilities Id': abils5 ? [abils5._id] : '',
//     '3 Abilities': abils3 ? [abils3._id] : '',
//     '2 Abilities': abils2 ? [abils2._id] : '',
//     '1 Abilities': abils1 ? [abils1._id] : '',
//     'Switch Skill': sSkill ? [sSkill._id] : '',
// })

exports.getAllJobs = async (req, res) => {
    try {
        const features = new APIFeatures(Job.find(), req.query)
        .filter()
        .sort()
        .limit()
        .paginate()

        const jobs = await  features.query
        res.status(200)
           .json({
               status: "success",
               results: jobs.length,
               data: {
                   jobs
               }
           })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: `error: ${err}`
        })
    }
}

exports.getJob = async (req, res) => {
    try {
        const job = await Job.find({ Job: req.params.name.replace('-', ' ')})
        res.status(200)
           .json({
               status: "success",
               data: {
                   job
               }
           })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: `error: ${err}`
        })
    }
}

exports.createJob = async (req, res) => {  
   try {  
    const newJob = await Job.create(req.body)
    res
    .status(201) // 201 = created; 204 = for delete, no data;
    .json({ 
        status: 'success',
        data: {
            job: newJob
        }
    })
   } catch(err) {
    console.log('err', err)
    res.status(400).json({
        status: "fail",
        message: err
    })
   }


    // tours.push(newTour)
    // fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), er => {

    //})
}