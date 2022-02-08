const express = require('express')
const abilitiesController = require('./../controllers/abilitiesController')

const router = express.Router()

router.route('/').get(abilitiesController.getAllAbilities)
// router.route('/').post(jobsController.createJob)
router.route('/:id').get(abilitiesController.getAbility)

module.exports = router