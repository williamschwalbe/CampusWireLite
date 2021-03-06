const express = require('express')

const User = require('../models/user')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.post('/signup', async (req, res) => {
  const { username, password } = req.body
  req.session.username = username
  req.session.password = password
  try {
    await User.create({ username, password })
    req.session.username = username
    req.session.password = password
    res.send(`${username} has succesfully been signed up`)
  } catch {
    res.send('ERROR: in creating user - user not signed up')
  }
})

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  try {
    User.findOne({ username, password }, (err, user) => {
      if (err) {
        next(err)
      }
      if (user) {
        req.session.username = username
        req.session.password = password
        res.send(`${username} is now logged in`)
      } else {
        res.send('ERROR: you are not logged in')
      }
    })
  } catch {
    res.send('ERROR occurs when user is creating')
  }
})

router.post('/logout', isAuthenticated, async (req, res) => {
  const currUser = req.session.username
  req.session.username = null
  req.session.password = null
  res.send(`${currUser} logged out`)
})

router.get('/currUser', async (req, res) => {
  res.send(req.session.username)
})

module.exports = router
