const User = require('../database/models/User')
module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    if (error) {
      const registerationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
      
      req.flash('registerationErrors', registerationErrors);
      req.flash('data', req.body);
      return res.redirect('/auth/register')
    }
    res.redirect('/')
  })
}