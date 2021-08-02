module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) return next()
    req.flash('warning_msg', '請先登入才能使用本網站功能')
    res.redirect('/users/login')
  }
}
