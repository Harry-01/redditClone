if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const User = require("./User")

const app = express()
//app.use(bodyParser.json)
let urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});



app.post('/api/users/auth/signin', async function (req, res) {
    const name = req.body
    if (name) {
      const getUser = await User.findOne(name)
      console.log(getUser)
      return res.status(200).send(`Welcome ${name}`)
    }
  
    res.status(401).send('Please Provide Credentials')
  })

  app.post('/api/users/auth/register', urlencodedParser, async function (req, res) {
    const name = req.body
    if (name) {
      const user = await User.create(name)
      console.log(user)
      return res.status(200).send(`Welcome ${name.username}`)
    }
    res.status(401).send('Please Provide Credentials')
  })


  app.listen(8000, console.log("listening on port 8000"))