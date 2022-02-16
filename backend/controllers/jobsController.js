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
        let inElems = { $in: ["Fire", "Water", "Earth", "Wind", "Thunder", "Dark", "Light", "Element"]}
        let inType = { $in: ["Damage", "Heal", "Buff", "InstantNerf", "Discard",
                            "InstantBoost", "Debuff", "Vulnerable", "Protect", "Curse", "Sacrifice", "Mark", "Null"] }
        let inEffects = { $in: [ "Strength", "MaxHP", "Agility", "Intelligence",
                            "Fire", "Water", "Earth", "Wind", "Thunder", "Dark", "Light", "Element",
                            "Venom", "Restrain", "Insane", "Bleed", "Injury", "Confuse", "Slack", "Certain",
                            "Charge", "Guard", "Dark", "Draw", "Protect", "Multiply", "Draw", "Action", "Direct", "Dice",
                            "Curse", "Null"] }

        let rarity = Object.entries(query).find(q => q[0] === 'rarity')
        let rarity2 = rarity[1] === 'All' ? {$gte: '1'} :  rarity[1]
        let type = Object.entries(query).find(q => q[0] === 'type') || 'All'
        let type2
        if (type) {
          switch (type[1]) {
            case 'RemoveDebuff':
              type2 = [
                {$and: [{'switchSkill_info.skill_unit1_skill': 'Protect'}, {'switchSkill_info.skill_unit1_effect': inElems} ]},
                {$and: [{'switchSkill_info.skill_unit2_skill': 'Protect'}, {'switchSkill_info.skill_unit2_effect': inElems} ]},
                {$and: [{'switchSkill_info.skill_unit3_skill': 'Protect'}, {'switchSkill_info.skill_unit3_effect': inElems} ]},
                {$and: [{'switchSkill_info.skill_unit4_skill': 'Protect'}, {'switchSkill_info.skill_unit4_effect': inElems} ]}
              ]
              break;
            case 'Negative':
              let inNegative = { $in: ["Sacrifice", "Curse"] }
              type2 = [
                {'switchSkill_info.skill_unit1_skill': inNegative},
                {'switchSkill_info.skill_unit2_skill': inNegative},
                {'switchSkill_info.skill_unit3_skill': inNegative},
                {'switchSkill_info.skill_unit4_skill': inNegative}
              ]
              break;
            default: 
              type2 = type[1] === 'All' ?
                [
                  {'switchSkill_info': []},
                  {'switchSkill_info.skill_unit1_skill': inType},
                  {'switchSkill_info.skill_unit2_skill': inType},
                  {'switchSkill_info.skill_unit3_skill': inType},
                  {'switchSkill_info.skill_unit4_skill': inType}
                ]
                : [
                  {'switchSkill_info.skill_unit1_skill': type[1]},
                  {'switchSkill_info.skill_unit2_skill': type[1]},
                  {'switchSkill_info.skill_unit3_skill': type[1]},
                  {'switchSkill_info.skill_unit4_skill': type[1]}
                ]
          }
        }
        let attr = Object.entries(query).find(q => q[0] === 'attribute')

        let attr2 = attr[1] === 'All' ?
        [
          {'switchSkill_info': []},
          {'switchSkill_info.skill_unit1_effect': inEffects},
          {'switchSkill_info.skill_unit2_effect': inEffects},
          {'switchSkill_info.skill_unit3_effect': inEffects},
          {'switchSkill_info.skill_unit4_effect': inEffects}
        ]
        : [
            {'switchSkill_info.skill_unit1_effect': attr[1]},
            {'switchSkill_info.skill_unit2_effect': attr[1]},
            {'switchSkill_info.skill_unit3_effect': attr[1]},
            {'switchSkill_info.skill_unit4_effect': attr[1]}
          ]
        let elem = Object.entries(query).find(q => q[0] === 'element')

        let elem2 = elem[1] === 'All' ?
        [
          {'switchSkill_info': []},
          {'switchSkill_info.skill_unit1_effect': inEffects},
          {'switchSkill_info.skill_unit2_effect': inEffects},
          {'switchSkill_info.skill_unit3_effect': inEffects},
          {'switchSkill_info.skill_unit4_effect': inEffects}
        ]
        : [
            {'switchSkill_info.skill_unit1_effect': elem[1]},
            {'switchSkill_info.skill_unit2_effect': elem[1]},
            {'switchSkill_info.skill_unit3_effect': elem[1]},
            {'switchSkill_info.skill_unit4_effect': elem[1]}
          ]

        let apply = Object.entries(query).find(q => q[0] === 'apply')
        let passive = Object.entries(query).find(q => q[0] === 'passive')
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
                // {
                //     $lookup: {
                //       from: "abilities",
                //       localField: "abilities_5id",
                //       foreignField: "_id",
                //       as: "abilities5_info"
                //     }
                // },
                {
                  $match: { $and: [
                    {rarity: rarity2 },
                    { $or: type2},
                    { $or: attr2 },
                    { $or: elem2}
                  ]}
                }
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