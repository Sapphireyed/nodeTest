const mongoose = require('mongoose')

const abilitySchema = mongoose.Schema({
    'Ability Name': String,
    'Ability Tier': String,
    Cost: Number
})

const Ability =  mongoose.model('abilities', abilitySchema)

module.exports = Ability