// include express and model
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')

// include dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const PORT = process.env.PORT

// set view templates
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: require('./controller/handlebarHelpers')
}))
app.set('view engine', 'hbs')

// include mongoose and connect to database
require('./config/mongoose')

// include routes
const routes = require('./routes')

// include passport
const usePassport = require('./config/passport')

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

// session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// passport
usePassport(app)

// store user info to locals
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`)
})
