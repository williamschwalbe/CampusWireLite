const isAuthenticated = () =>{
    const {username} = req.session
    if (username){
        next()
    } else {
        next(new Error("no user logged in -- session has noone logged in"))
    }
}
module.exports = isAuthenticated