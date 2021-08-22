//Import dependencies
const express = require('express')
const dotenv = require('dotenv')
const logger = require('morgan')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')

//Load env variables

dotenv.config({ path : './config/config.env'})
//Load routes
const bootcamps = require('./routes/bootcamps')

//Initializing app
const app = express()

//Connect to database
connectDB()

//Body parser
app.use(express.json())

//Conditionally calling middleware
if(process.env.NODE_ENV === 'development')
{
    app.use(logger())
}

//Mount routers
app.use('/api/v1/bootcamps', bootcamps)

//Error handler
app.use(errorHandler)

//Create Express server
const PORT = process.env.PORT;
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode in port ${PORT}`))

//Handle unhandled rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`)
    //Close server and exit process
    server.close(() => process.exit(1))
})