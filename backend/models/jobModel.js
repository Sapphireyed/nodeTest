const mongoose = require('mongoose')
const Ability = require('./../models/abilityModel');

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
    Abilities5: {
        type: mongoose.Schema.ObjectId,
        ref: 'abilities'
    },
    Abilities1: [{
        type: mongoose.Schema.ObjectId,
        ref: 'abilities'
        }]
})
const Job =  mongoose.model('jobs', jobSchema)
let updateJobs = async () => {
    const abilities = await Ability.find()
    const jobs = await Job.find()
    jobs.map(async (j,i) => {
        let abils5 = abilities.find(ab => ab['Ability Name'] == j['5 Abilities'])
        abils5 = abils5 ? abils5._id : ''
        let abils3 = abilities.find(ab => ab['Ability Name'] == j['3 Abilities'])
        let abils2 = abilities.find(ab => ab['Ability Name'] == j['2 Abilities'])
        abils2 = abils2 ? abils2._id : ''
        let abils1 = abilities.find(ab => ab['Ability Name'] == j['1 Abilities'])
        abils1 = abils1 ? [abils1._id] : ''
        let sSkill = abilities.find(ab => ab['Ability Name'] == j['Switch Skill'])

        await Job.updateOne( { Job: j.Job}, { $set: { Abilities1: abils1 } } )
        await Job.updateOne( { Job: j.Job}, { $set: { Abilities5: abils5 } } )

    })
}
updateJobs()


//Job.updateMany( {}, )
//try updateMany to convert names to ids...
// let job = ({...j._doc, 
//     '5 Abilities Id': abils5 ? [abils5._id] : '',
//     '3 Abilities': abils3 ? [abils3._id] : '',
//     '2 Abilities': abils2 ? [abils2._id] : '',
//     '1 Abilities': abils1 ? [abils1._id] : '',
//     'Switch Skill': sSkill ? [sSkill._id] : '',
// })

module.exports = Job