const path = require('path');
const express = require('express');
const jobsRouter = require('./routes/jobsRoutes');
const abilitiesRouter = require('./routes/abilitiesRoutes');
const viewsRouter = require('./routes/viewsRoutes');
const imgRouter = require('./routes/imgRoutes');
const fs = require('fs');

//localization
const jobsLocRouter = require('./routes/jobsLocRoutes.js');

const app = express();
app.use(express.json());  //to have access to body

//serving static files MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));   // ./ is relative path and might not always be root so better to use path variable


// CODE TO BE EXECUTED WHEN UPDATING DB FILE

// let jobsData = fs.readFileSync(`${__dirname}/db/jobs.csv`, 'utf-8')
// let firstLine = jobsData.split('\r')[0].split(',').map(r=> r.toLowerCase().replace(/ /g, '_').replace(/lv10_/g, ''))
// firstLine = firstLine.map(l => l.replace('1_abilities', 'abilities_1')
//                                 .replace('2_abilities', 'abilities_2')
//                                 .replace('3_abilities', 'abilities_3')
//                                 .replace('5_abilities', 'abilities_5')).join(',')
// jobsData = jobsData.split('\r')
// jobsData.splice(0,1, firstLine)
// jobsData = jobsData.join('\r')

// fs.writeFileSync(`${__dirname}/db/jobs.csv`, jobsData)


// ROUTES
app.get('/', (req, res)=> {
  res.status(200).render('base')
})


app.use('/api/v1/jobs', jobsRouter);
app.use('/api/v1/abilities', abilitiesRouter);

app.use('/', viewsRouter);

app.use('/api/v1/imgs', imgRouter)

// LOCALIZATION
app.use('/api/v1/jobsLoc', jobsLocRouter);

module.exports = app
