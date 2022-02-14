const mongoose = require('mongoose')
const Ability = require('./../models/abilityModel');

const jobSchema = mongoose.Schema({
    '0': Number,
    job: {
        type: String,
        unique: true
    },
    rarity: Number,
    hp: Number,
    strength: Number,
    agility: Number,
    intelligence: Number,
    passive_skill: String,
    switch_skill: String,
    abilities_5: String,
    abilities_3: String,
    abilities_2: String,
    abilities_1: String,
    abilities_5id: {
        type: mongoose.Schema.ObjectId,
        ref: 'abilities'
    },
    abilities_3id: {
        type: mongoose.Schema.ObjectId,
        ref: 'abilities'
    },
    abilities_2id: {
        type: mongoose.Schema.ObjectId,
        ref: 'abilities'
    },
    abilities_1id: {
        type: mongoose.Schema.ObjectId,
        ref: 'abilities'
    },
    switch_skill_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'abilities'
    }
})

jobSchema.pre(/^find/, function(next) { 
    //  this.populate({path: 'abilities_1', select: '-0 -_id -IconImage'})
    //      .populate({path: 'abilities_5', select: '-0 -_id -IconImage'})
    //      .populate({path: 'switch_skill', select: '-0 -_id -IiconImage'})
    next()
})

jobSchema.post(/^find/, function(doc, t, next) { 
      //  console.log(t)
    next()
})

jobSchema.index({Rarity: 1})

// VIRTUAL POPULATE

// jobSchema.virtual('switchskill', {
//   ref: 'abilities',
//   foreignField: 'switch_skill',
//   localField: '_id'
// })

const Job =  mongoose.model('jobs', jobSchema)

let updateJobs = async () => {
    try {
        const abilities = await Ability.find()
        const jobs = await Job.find()
        let alljobs = jobs.map(async (j,i) => {
            try {
                let abils5 = await abilities.find(ab => ab.name == j['abilities_5'])
                let abils3 = await abilities.find(ab => ab.name == j['abilities_3'])
                let abils2 = await abilities.find(ab => ab.name == j['abilities_2'])
                let abils1 = await abilities.find(ab => ab.name == j['abilities_1'])
                let sSkill = await abilities.find(ab => ab.name == j['switch_skill'])

                if (j['abilities_5']) {
                    await Job.updateOne( { job: j.job}, { $set: { abilities_5id: abils5 } } )
                }
                if (j['abilities_1']){
                    await Job.updateOne( { job: j.job}, { $set: { abilities_1id: abils1 } } )
                }
                if (j['abilities_3']){
                    await Job.updateOne( { job: j.job}, { $set: { abilities_3id: abils3 } } )
                }
                if (j['abilities_2']){
                    await Job.updateOne( { job: j.job}, { $set: { abilities_2id: abils2 } } )
                }
                if (j['switch_skill']){
                    await Job.updateOne( { job: j.job}, { $set: { switch_skill_id: sSkill } } )
                }

                // let rar = j.rarity * 1
                // let hp = j.hp * 1
                // let str = j.str * 1
                // let agi = j.agi * 1
                // let int = j.int * 1
                // await Job.updateOne( { job: j.job}, { $set: {
                //     rarity: rar,
                //     hp: hp, 
                //     strength: parseInt(j.strength), 
                //     agility: agi, 
                //     int: int 
                // }})
            } catch (err) { }
        })
        Promise.all(alljobs)
    } catch (err) {console.log('errrrr', err)}

}
updateJobs()

module.exports = Job