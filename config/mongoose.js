// include mongoose and connect to database
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const db = mongoose.connection

db.on('error', () => { console.error('Failed to connect to mongoDB!') })
db.once('open', () => { console.log('The server is connected to mongoDB!') })

module.exports = db
