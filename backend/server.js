const dotenv = require('dotenv')
dotenv.config({ path: './config.env' }); //reads all the variables from config.env and saves them to nodejs enviroment variables
const mongoose = require('mongoose')  // to connect node app to mongo db

const app = require('./app')

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
}).then(con => console.log('DB connection successfull'))

const port = process.env.PORT || 3300
app.listen(port, () => {
    console.log(`app running on port ${port}....`)
})