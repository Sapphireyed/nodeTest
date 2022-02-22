const mongoose = require('mongoose')

const unitsSchema = mongoose.Schema({
'0': Number,
'Power Lv': Number,
'Str/Agi/Int': String,
'MaxHP (Player)': String,
'MaxHP (Enemy)': String
})

const Unit = mongoose.model('skillUnits', unitsSchema, 'skillUnits')

module.exports = Unit