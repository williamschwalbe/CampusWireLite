const isAuthenticated = (req, res, next) => {
  const { username } = req.session
  if (username) {
    next()
  } else {
    next(new Error(`cannot access ${req.path} as nobody is logged in`))
  }
}
module.exports = isAuthenticated
