const mongoose = require('mongoose')
const { descrLoc } = require('./../models/locModels');
const Unit = require('./../models/unitsModel');

const abilitySchema = mongoose.Schema({
  '0': Number,
    name: String,
    tier: String,
    cost: Number,
    description: String,
    description1_Id: {
      type: mongoose.Schema.ObjectId,
      ref: 'descrLoc'
    },
    replace1: Array,
    description2_Id: {
      type: mongoose.Schema.ObjectId,
      ref: 'descrLoc'
    },
    replace2: Array,
    description3_Id: {
      type: mongoose.Schema.ObjectId,
      ref: 'descrLoc'
    },
    replace3: Array,
    description4_Id: {
      type: mongoose.Schema.ObjectId,
      ref: 'descrLoc'
    },
    replace4: Array,
    skill_unit1_skill: String,
    skill_unit1_effect: String,
    multiplier1: String,
    multi1: String,
    skill_unit2_skill: String,
    skill_unit2_effect: String,
    multiplier2: Number,
    multi2: String,
    skill_unit3_skill: String,
    skill_unit3_effect: String,
    multiplier3: Number,
    multi3: String,
    skill_unit4_skill: String,
    skill_unit4_effect: String,
    multiplier4: Number,
    multi4: String,
    apply1: String,
    apply2: String,
    apply3: String
})


const Ability =  mongoose.model('abilities', abilitySchema)

let updatedAbilities = async () => {
  try {

  } catch (err) {
    console.log('err', err)
  }

}
updatedAbilities()

module.exports = Ability