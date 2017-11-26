const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = express()

const saltRounds = 10

// db
mongoose.connect('mongodb://localhost/forge', { useMongoClient: true })
const db = mongoose.connection

// check connection
db.once('open', () => {
  console.log('Connected to MongoDB.')
})

// check for db errors
db.on('error', (err) => {
  console.log(err)
})

// models
const User = require('./models/users')

// app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)

// login
app.post('/login', (req, response) => {
  const username = req.body.username
  const password = req.body.password

  // fetch hashed password from db instead
  User.find({ username: username }, (err, res) => {
    if (err || !res.length) {
      console.log(err)
      response.send({ success: false })
      return
    }

    const hash = res[0].password
    bcrypt.compare(password, hash, (err, result) => {
      response.send({ success: result })
    })
  })
})

app.use('/', express.static(path.join(__dirname, '/public/')))
app.all('*', (req, res) => {
  res.redirect('/')
})

app.listen(app.get('port'), () => {
  console.log('Listening on port %d.', app.get('port'))
})
