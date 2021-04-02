const isAuthenticated = (req, res, next) => {
    const { username } = req.session
    if (username) {
        console.log("user is logged in and we have now authenticated user")
        next()
    } else {
        next(new Error(`cannot access ${req.path} as nobody is logged in`))
    }
}
module.exports = isAuthenticated