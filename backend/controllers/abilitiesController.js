const Ability = require('./../models/abilityModel');
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