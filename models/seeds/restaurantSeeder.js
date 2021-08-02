const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// include seeder's data
const data = require('./restaurant.json')
const restaurantList = data.results
const Restaurant = require('../restaurant')
const User = require('../user')
const SEED_USER = [
  {
    name: '使用者一',
    email: 'user1@example.com',
    password: '12345678',
    restaurantId: [1, 2, 3]
  },
  {
    name: '使用者二',
    email: 'user2@example.com',
    password: '12345678',
    restaurantId: [4, 5, 6]
  }
]

// connect to database
const db = require('../../config/mongoose')

db.once('open', () => {
  return Promise.all(SEED_USER.map(async (user) => {
    // create seed user
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    const createdUser = await User.create({
      name: user.name,
      email: user.email,
      password: hash
    })
    // filter restaurant data linked to user
    const restaurantArray = []
    restaurantList.forEach((restaurant) => {
      if (user.restaurantId.includes(restaurant.id)) {
        restaurant.userId = createdUser._id
        restaurantArray.push(restaurant)
      }
    })
    await Restaurant.insertMany(restaurantArray)
    console.log(`已新增${createdUser.name}的資料！`)
  }))
    .then(() => {
      console.log('Success to set the seeder!')
      db.close()
    })
})
