if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json)
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

let schema = mongoose.Schema({
  _id : Number,
  email : String,
  password : String
})

mongoose.model('schema', schema)


app.post('/api/users/auth/signin', (req, res) => {
    const name = req.body
    if (name) {
      let personData = new schema(name)
      personData.save()
      console.log(name)
      return res.status(200).send(`Welcome ${name}`)
    }
  
    res.status(401).send('Please Provide Credentials')
  })

  app.post('/api/users/auth/register', (req, res) => {
    const name = req.body
    if (name) {
      
      console.log(name)
      return res.status(200).send(`Welcome ${name}`)
    }
  
    res.status(401).send('Please Provide Credentials')
  })

  app.listen(8000, console.log("listening on port 8000"))