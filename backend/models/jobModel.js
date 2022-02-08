const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
    Job: String,
    Rarity: Number,
    'Lv10 HP': Number,
    'Lv10 Strength': Number,
    'Lv10 Agility': Number,
    'Lv10 Intelligence': Number,
    'Passive Skill': String,
    'Switch Skill': String,
    '5 Abilities': String,
    '3 Abilities': String,
    '2 Abilities': String,
    '1 Abilities': String,
    '5 Abilities Id': {
        type: mongoose.Schema.ObjectId,
        ref: 'abilites'
    }
})

jobSchema.pre('save', function(next) {
    console.log('this in doccument middleware', this['5 Abilities'])  // this => document that is currently processd
    next()
})  
const Job =  mongoose.model('jobs', jobSchema)

module.exports = Job