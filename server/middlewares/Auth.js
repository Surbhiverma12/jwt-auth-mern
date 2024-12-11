const jwt = require('jsonwebtoken')

const ensureAuth = (req, res, next) => {
    const auth = req.headers['authorization']
    console.log(auth)
    if(!auth) {
        return res.status(403)
            .json({message: "inauthorized, jwt token is requiered"})
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401)
        .json({message: "inauthorized, jwt token is wrong or expired"})
    }
}


module.exports = ensureAuth;