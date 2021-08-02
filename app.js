// include express and model
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')

const app = express()
const PORT = 3000

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
  secret: 'MyRestaurantSecret',
  resave: false,
  saveUninitialized: true
}))

// passport
usePassport(app)

app.use(routes)

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`)
})
