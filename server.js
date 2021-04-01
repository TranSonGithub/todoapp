const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const mongoose = require('mongoose')

require('dotenv').config()
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI

// set middleware
app.set('views', './views')
app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// transform data to json
app.use(express.json())
app.use(express.urlencoded({extended: true}) )

// connect mongodb
mongoose.connect(`${MONGO_URI}/todos`, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.once('open', () => console.log('Connect database success'))
db.on('error', (e) => console.log(e))

// Router app
const index = require('./router/index')
const todo = require('./router/todo')

app.use('/', index)
app.use('/todos', todo)


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))