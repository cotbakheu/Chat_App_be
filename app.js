const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')
const socket = require('./src/socket/socket')
const userRoute = require('./src/route/users')

const app = express()


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(userRoute)
// open route for public image
app.use('/images', express.static('./public/images'))

const server = http.createServer(app);
socket(server)

server.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`)
})