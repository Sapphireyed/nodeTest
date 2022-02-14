const mongoose = require('mongoose')

const abilitySchema = mongoose.Schema({
    name: String,
    tier: String,
    Cost: Number
})

const Ability =  mongoose.model('abilities', abilitySchema)

module.exports = Ability