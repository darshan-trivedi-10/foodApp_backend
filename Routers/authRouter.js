const express = require('express');
const authRouter = express.Router();
const userModel = require('../Modles/userModel')
const jwt = require('jsonwebtoken')
const JWT_KEY = require('../../secreates')

console.log(JWT_KEY);

authRouter
    .route('/signup')
    .post(postSignUp)
authRouter
    .route('/login')
    .post(loginUser)


async function postSignUp(req, res) {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    console.log('hii')
    res.json({
        message: 'user Signed UP',
        data: user
    })
}




async function loginUser(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                if (user.password == data.password) {
                    let uniqueId = user['_id'];
                    let token = jwt.sign(
                        { payload: uniqueId }, JWT_KEY
                    )

                    res.cookie('login', token, { httpOnly: true });
                    return res.json({
                        message: 'User Login successfully'
                    })
                } else {
                    return res.json({
                        message: 'Wrong Credentials'
                    })
                }
            } else {
                return res.json({
                    message: 'User Not Found !!'
                })
            }
        }
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}

module.exports = authRouter;