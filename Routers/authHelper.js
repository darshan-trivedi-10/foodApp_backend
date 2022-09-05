const jwt = require('jsonwebtoken')
const screateKey = require('../../secreates')


function protectRouter(req, res, next) {
    console.log(req.cookies)
    if (req.cookies.login) {
        let isVerified = jwt.verify(req.cookies.login, screateKey.JWT_KEY);
        if (isVerified) {
            next();
        } else {
            return res.json({
                message: 'user not verified'
            })
        }
    } else {
        return res.json({
            message: 'Operastion not allowed . . .'
        })
    }

}


module.exports = protectRouter;