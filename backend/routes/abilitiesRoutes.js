const express = require('express')
const abilitiesController = require('./../controllers/abilitiesController')

const router = express.Router()

router.route('/').get(abilitiesController.getAllAbilities)
// router.route('/').post(jobsController.createJob)
router.route('/:id').get(abilitiesController.getAbility)

//router.route('/descr').get(abilitiesController.getDescription)

module.exports = router