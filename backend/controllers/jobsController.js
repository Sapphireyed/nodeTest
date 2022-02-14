const Job = require('./../models/jobModel');
const APIFeatures = require('./../utils/apiFeatures')

exports.getAllJobs = async (req, res) => {
    try {
        const features = new APIFeatures(Job.find(), req.query)
        .filter()
        .sort()
        .limit()
        .paginate()

        let jobs = await features.query
   
        // if (req.query['SwitchSkill.Cost']) {
        //     jobs = jobs.filter(j => j.SwitchSkill && j.SwitchSkill.Cost == req.query['SwitchSkill.Cost'])
        // }
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
        const job = await Job.find(({ job: req.params.name.replace('-', ' ')})).populate('switch_skill_id')
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
    res.status(400).json({
        status: "fail",
        message: err
    })
   }
}

exports.getFiltered= async (req, res) => {
    try {
        const query = req.query
        console.log(query, req.params.filterBy)
        const filteredJobs = await Job.aggregate(

            // Pipeline
            [
                // Stage 1
                {
                    $lookup: {
                        from: "abilities",
                        localField: "switch_skill_id",
                        foreignField: "_id",
                        as: "switchSkill_info"
                    }
                },
                {
                    $match: {'switchSkill_info.cost': '1' }
                }
                // {
                //     $project: {
                //         Job: 1,
                //         _id: 0
                //     }
                // }
        
            ]
        
        );
        res.status(200).json({
            status: 'success1',
            results: filteredJobs.length,
            data: {
                filteredJobs
            }
        })
    } catch (err) {}
}