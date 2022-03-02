const Ability = require('./../models/abilityModel');
const { descrLoc } = require('./../models/locModels');
const APIFeatures = require('./../utils/apiFeatures')

exports.getAllAbilities = async (req, res) => {
    try {
        const features = new APIFeatures(Ability.find(), req.query)
        .filter()
        .sort()
        .limit()
        .paginate()

        let abilities = await features.query

        res.status(200)
           .json({
               status: "success",
               results: abilities.length,
               data: {
                   abilities
               }
           })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: `error: ${err}`
        })
    }
}

exports.getAbility = async (req, res) => {
    try {
        const ability = await Ability.findById( req.params.id)
        res.status(200)
           .json({
               status: "success",
               data: {
                   ability
               }
           })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: `error: ${err}`
        })
    }
}

exports.getDescription = async (req, res) => {
  try {
    const descritpions = await descrLoc.find()

    const descriptions = await Job.aggregate(
      [
          // {
          //     $lookup: {
          //         from: "abilities",
          //         localField: "switch_skill_id",
          //         foreignField: "_id",
          //         as: "switchSkill_info"
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

  )

    res.status(200)
       .json({
           status: "success",
           results: '',
           data: {
            descriptions
           }
       })
  } catch (err) {
      res.status(404).json({
          status: 'fail',
          message: `error: ${err}`
      })
  }
}