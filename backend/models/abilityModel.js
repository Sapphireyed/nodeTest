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
    replace1: String,
    description2_Id: {
      type: mongoose.Schema.ObjectId,
      ref: 'descrLoc'
    },
    replace2: String,
    description3_Id: {
      type: mongoose.Schema.ObjectId,
      ref: 'descrLoc'
    },
    replace3: String,
    description4_Id: {
      type: mongoose.Schema.ObjectId,
      ref: 'descrLoc'
    },
    replace4: String,
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

abilitySchema.pre(/^find/, function(next) { 
  this.populate({path: 'description1_Id'})
      .populate({path: 'description2_Id'})
      .populate({path: 'description3_Id'})
      .populate({path: 'description4_Id'})
  next()
})
abilitySchema.post(/^find/, function(docs, next) { 
  //  console.log('lll', docs)
  next()
})

const Ability =  mongoose.model('abilities', abilitySchema)

let updatedAbilities = async () => {
  try {
    // get all needed collections
    const abilities = await Ability.find()
    //if (!abilities.some(abil => abil.description1_Id)) {
      const descritpions = await descrLoc.find()

      const units = await Unit.find()
      //DAMAGE
      let dealXDamageJoin =  await descrLoc.find({Keys: 'DealXDamageJoin'})
      dealXDamageJoin = dealXDamageJoin[0]._id
      let eElementXAttackDescr = await descrLoc.find({Keys: 'EElementXAttackDescr'})
      eElementXAttackDescr = eElementXAttackDescr[0]._id
      let vRIDamageXDescr = await descrLoc.find({Keys: 'VRIDamageXDescr'})
      vRIDamageXDescr = vRIDamageXDescr[0]._id
      let debuffRemoveXAttackDescr = await descrLoc.find({Keys: 'DebuffRemoveXAttackDescr'})
      debuffRemoveXAttackDescr = debuffRemoveXAttackDescr[0]._id
      let bleedBurstDescr = await descrLoc.find({Keys: 'BleedBurstDescr'})
      bleedBurstDescr = bleedBurstDescr[0]._id
      //HEAL
      let healXJoin =  await descrLoc.find({Keys: 'HealXJoin'})
      healXJoin = healXJoin[0]._id
      


      // get easy acces to multipliers values
      let hpPlayer = {}
      let hpEnemy = {}
      let otherAttrs = {}
      for (let i=1; i <= 8; i++ ) {
        hpPlayer[i] = await units.find(u => u['Power Lv'] == i)['MaxHP (Player)']
        hpEnemy[i] = await units.find(u => u['Power Lv'] == i)['MaxHP (Enemy)']
        otherAttrs[i] = await units.find(u => u['Power Lv'] == i)['Str/Agi/Int']
      }

      // get arrays
      const attrs = ['Strength', 'Agility', 'Intelligence', 'MaxHP']
      const attrsNoHp = ['Strength', 'Agility', 'Intelligence']
      const elems = ['Fire', 'Water', 'Earth', 'Wind', 'Thunder', 'Dark', 'Light', 'Element']
      const vri = ['Venom', 'Restrain', 'Insane']
          // change abils one by one
    let abilsAll = abilities.map(async (abil, index) => {
      try {
        const getDescName = async (skill, effect,desc, replace, num) => {
          try {
            switch (skill) {
              case 'Damage':
                if (attrs.some(attr => attr === effect)) {
                  let setDesc = { [desc]: dealXDamageJoin }
                  let setReplace
                  if (num === 1) {
                    setReplace = { [replace]: abil.multi1 }
                  }
                  if (num === 2) {
                    setReplace = { [replace]: abil.multi2 }
                  }
                  if (num === 3) {
                    setReplace = { [replace]: abil.multi3 }
                  }
                  if (num === 4) {
                    setReplace = { [replace]: abil.multi4 }
                  }
                  await Ability.updateOne( { name: abil.name}, { $set: setDesc })
                  await Ability.updateOne( { name: abil.name}, { $set: setReplace })
                }
                if (effect === 'Null') {
                  let setDesc = { [desc]: dealXDamageJoin }
                  let setReplace;
                  if (num === 1) {
                    setReplace = { [replace]: abil.multiplier1 }
                  }
                  if (num === 2) {
                    setReplace = { [replace]: abil.multiplier2 }
                  }
                  if (num === 3) {
                    setReplace = { [replace]: abil.multiplier3 }
                  }
                  if (num === 4) {
                    setReplace = { [replace]: abil.multiplier4 }
                  }
                  await Ability.updateOne( { name: abil.name}, { $set: setDesc })
                  await Ability.updateOne( { name: abil.name}, { $set: setReplace })
                }
                if (elems.some(elem => elem === effect)) {
                  console.log('abil', abil)
                  let setDesc = { [desc]: eElementXAttackDescr }
                  let eff = await descrLoc.find({Keys: effect})
                  let finale = await descrLoc.find({Keys: 'XFinale'})
                  let setReplace;
                  if (num === 1) {
                    setReplace = { [replace]: `${eff}|| ${abil.multi1}|| ${finale}` }
                  }
                  if (num === 2) {
                    setReplace = { [replace]: `${eff}|| ${abil.multi2}|| ${finale}` }
                  }
                  if (num === 3) {
                    setReplace = { [replace]: `${eff}|| ${abil.multi3}|| ${finale}` }
                  }
                  if (num === 4) {
                    setReplace = { [replace]: `${eff}|| ${abil.multi4}|| ${finale}` }
                  }

                  // if (abil.description1_Id) {
                  //   let newObj = {}
                  //   eElementXAttackDescr = Object.entries(abil.description1_Id._doc).map(([k,v]) => {
                  //     if (typeof v === 'string') {
                  //       newObj = {
                  //         k: k,
                  //         v: v.replace('{0}', 'hhh')
                  //       }
                  //     }

                  // })
                  // console.log(newObj)
                  await Ability.updateOne( { name: abil.name}, { $set: setDesc })
                  await Ability.updateOne( { name: abil.name}, { $set: setReplace })
                }
                if (vri.some(debuff => debuff === effect)) {
                  let setDesc = { [desc]: vRIDamageXDescr }
                  let setReplace = { [replace]: 'effect, multi, attr corresponding to vri' }
                  await Ability.updateOne( { name: abil.name}, { $set: setDesc })
                  await Ability.updateOne( { name: abil.name}, { $set: setReplace })
                }
                if (effect === 'Debuff') {
                  let setDesc = { [desc]: debuffRemoveXAttackDescr }
                  let setReplace = { [replace]: 'multi ?' }
                  await Ability.updateOne( { name: abil.name}, { $set: setDesc })
                  await Ability.updateOne( { name: abil.name}, { $set: setReplace })
                }
                if (effect === 'Bleed') {
                  let setDesc = { [desc]: bleedBurstDescr }
                  let setReplace = { [replace]: 'bleed, 2%, maxhp  ?' }
                  await Ability.updateOne( { name: abil.name}, { $set: setDesc })
                  await Ability.updateOne( { name: abil.name}, { $set: setReplace })
                }
                break;
              case 'Heal':
                if (attrs.some(attr => attr === effect)) {
                  let setDesc = { [desc]: healXJoin }
                  let setReplace = { [replace]: 'multi' }
                  await Ability.updateOne( { name: abil.name}, { $set: setDesc })
                  await Ability.updateOne( { name: abil.name}, { $set: setReplace })
                }
                if (effect === 'Null') {
                  let setDesc = { [desc]: healXJoin }
                  let setReplace = { [replace]: 'multiplier' }
                  await Ability.updateOne( { name: abil.name}, { $set: setDesc })
                  await Ability.updateOne( { name: abil.name}, { $set: setReplace })
                }
                break
              
            }
          }catch (err) {
            console.log('errpr inside', err)
          }

        }

        getDescName(abil.skill_unit1_skill, abil.skill_unit1_effect, 'description1_Id', 'replace1',1)
        getDescName(abil.skill_unit2_skill, abil.skill_unit2_effect, 'description2_Id', 'replace2',2)
        getDescName(abil.skill_unit3_skill, abil.skill_unit3_effect, 'description3_Id', 'replace3',3)
        getDescName(abil.skill_unit4_skill, abil.skill_unit4_effect, 'description4_Id', 'replace4',4)


        // assigning multi appropriate percentage based on power level
        let index1 = abil.multiplier1
        let index2 = abil.multiplier2
        let index3 = abil.multiplier3
        let index4 = abil.multiplier4
        let skillsPerc = ['Damage', 'Heal', 'Protect', 'Sacrifice']
        for (let i = 0; i < 8; i++) {
          //multiplier1
          if ( skillsPerc.some(s => s === abil.skill_unit1_skill)) {
            if (attrsNoHp.some(attr => attr === abil.skill_unit1_effect) ) {
              await Ability.updateOne( { name: abil.name}, {$set: { multi1:  otherAttrs[index1]} } )
            }
            if (abil.skill_unit1_effect === 'MaxHP') {
              let multi = `${hpEnemy[index1]} / ${hpPlayer[index1]}`
              await Ability.updateOne( { name: abil.name}, {$set: { multi1:  multi} } )
            }
            if (elems.some(elem => elem === abil.skill_unit1_effect) ) {
              await Ability.updateOne( { name: abil.name}, {$set: { multi1:  otherAttrs[index1]} } )
            }
          }

          //multiplier2
          if ( skillsPerc.some(s => s === abil.skill_unit2_skill)) {
            if (attrsNoHp.some(attr => attr === abil.skill_unit2_effect)) {
              await Ability.updateOne( { name: abil.name}, {$set: { multi2:  otherAttrs[index2]} } )
            }
            if (abil.skill_unit2_effect === 'MaxHP') {
              let multi = `${hpEnemy[index2]} / ${hpPlayer[index2]}`
              await Ability.updateOne( { name: abil.name}, {$set: { multi2:  multi} } )
            }
          }

          // multiplier3
          if ( skillsPerc.some(s => s === abil.skill_unit3_skill)) {
            if (attrsNoHp.some(attr => attr === abil.skill_unit3_effect)) {
              await Ability.updateOne( { name: abil.name}, {$set: { multi3:  otherAttrs[index3]} } )
            }
            if (abil.skill_unit3_effect === 'MaxHP') {
              let multi = `${hpEnemy[index3]} / ${hpPlayer[index3]}`
              await Ability.updateOne( { name: abil.name}, {$set: { multi3:  multi} } )
            }
          }

          //multiplier4
          if ( skillsPerc.some(s => s === abil.skill_unit4_skill)) {
            if (attrsNoHp.some(attr => attr === abil.skill_unit4_effect)) {
              await Ability.updateOne( { name: abil.name}, {$set: { multi4:  otherAttrs[index4]} } )
            }
            if (abil.skill_unit4_effect === 'MaxHP') {
              let multi = `${hpEnemy[index4]} / ${hpPlayer[index4]}`
              await Ability.updateOne( { name: abil.name}, {$set: { multi4:  multi} } )
            }
          }

        } 
      } catch (err) {
        console.log('err inside', err)
      }
    })
    Promise.all(abilsAll)
    //}


  } catch (err) {
    console.log('err', err)
  }

}
updatedAbilities()

module.exports = Ability