const mongoose = require('mongoose')
const Ability = require('./../models/abilityModel');

const jobSchema = mongoose.Schema({
    job: {
        type: String,
        unique: true
    },
    rarity: Number,
    hp: Number,
    str: Number,
    agi: Number,
    int: Number,
    passive_skill: String,
    // abilities_5: {
    //     type: String
    // },
    // abilities_3: {
    //     type: String
    // },
    // abilities_2: {
    //     type: String
    // },
    // abilities_1: {
    //     type: String
    // },
    // switch_skill: {
    //     type: String
    // },
    abilities_5: {
        type: mongoose.Schema.ObjectId,
        ref: 'abilities'
    },
    abilities_3: {
        type: mongoose.Schema.ObjectId,
        ref: 'abilities'
    },
    abilities_2: {
        type: mongoose.Schema.ObjectId,
        ref: 'abilities'
    },
    abilities_1: {
        type: mongoose.Schema.ObjectId,
        ref: 'abilities'
    },
    switch_skill: {
        type: mongoose.Schema.ObjectId,
        ref: 'abilities'
    }
})

jobSchema.pre(/^find/, function(next) { 
    // this.populate({path: 'abilities_1', select: '-0 -_id -IconImage'})
    //     .populate({path: 'abilities_5', select: '-0 -_id -IconImage'})
    //     .populate({path: 'switch_skill', select: '-0 -_id -IiconImage'})
    next()
})

jobSchema.post(/^find/, function(doc, t, next) { 
      //  console.log(t)
    next()
})

jobSchema.index({Rarity: 1})

const Job =  mongoose.model('jobs', jobSchema)

let updateJobs = async () => {
    try {
        const abilities = await Ability.find()
        const jobs = await Job.find()
        jobs.map(async (j,i) => {
            try {
                let abils5 = await abilities.find(ab => ab['Ability Name'] == j['abilities_5'])
                let abils3 = await abilities.find(ab => ab['Ability Name'] == j['abilities_3'])
                let abils2 = await abilities.find(ab => ab['Ability Name'] == j['abilities_2'])
                let abils1 = await abilities.find(ab => ab['Ability Name'] == j['abilities_1'])
                let sSkill = await abilities.find(ab => ab['Ability Name'] == j['switch_skill'])

                if (j['abilities_5']) {
                    await Job.updateOne( { job: j.job}, { $set: { abilities_5: abils5 } } )
                }
                if (j['abilities_1']){
                    await Job.updateOne( { job: j.job}, { $set: { abilities_1: abils1 } } )
                }
                if (j['abilities_3']){
                    await Job.updateOne( { job: j.job}, { $set: { abilities_3: abils3 } } )
                }
                if (j['abilities_2']){
                    await Job.updateOne( { job: j.job}, { $set: { abilities_2: abils2 } } )
                }
                if (j['switch_skill']){
                    await Job.updateOne( { job: j.job}, { $set: { switch_skill: sSkill } } )
                }

                // let rar = j.rarity * 1
                // let hp = j.hp * 1
                // let str = j.str * 1
                // let agi = j.agi * 1
                // let int = j.int * 1
                // await Job.updateOne( { job: j.job}, { $set: {
                //     rarity: rar,
                //     hp: hp, 
                //     str: str, 
                //     agi: agi, 
                //     int: int 
                // }})
            } catch (err) { }
        })
    } catch (err) {console.log('errrrr', err)}

}
updateJobs()

module.exports = Job