const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')
const bcrypt = require('bcryptjs')

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, comfirmPassword } = req.body
  const errors = []
  if (!email || !password || !comfirmPassword) {
    errors.push({ message: 'Email 與密碼是必填資料。' })
  }
  if (password !== comfirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符。' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      comfirmPassword
    })
  }
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '該 email 已經被註冊。' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        comfirmPassword
      })
    }

    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch((err) => console.error(err))
  })
})

router.get('/login', (req, res) => {
  const error = req.flash('error')
  if (error[0] === 'Missing credentials') {
    error[0] = '請輸入 email 與密碼！'
  }
  res.render('login', { warning_msg: error[0] || res.locals.warning_msg })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已成功登出！')
  res.redirect('/users/login')
})

module.exports = router
