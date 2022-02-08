const express = require('express');
const jobsRouter = require('./routes/jobsRoutes')
const abilitiesRouter = require('./routes/abilitiesRoutes')

const app = express()
app.use(express.json())

app.use('/api/v1/jobs', jobsRouter)
app.use('/api/v1/abilities', abilitiesRouter)

module.exports = app
