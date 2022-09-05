const express = require('express');
const userModel = require('../Modles/userModel')
const jwt = require('jsonwebtoken')
const screateKey = require('../../secreates');
const { use } = require('../Routers/userRouter');



module.exports.singup = async function singup(req, res) {
    try {
        let dataObj = req.body;
        let user = await userModel.create(dataObj);
        if (user) {
            res.json({
                message: 'user Signed UP',
                data: user
            })
        } else {
            res.json({
                message: 'Error While SingUp',
            })
        }
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

module.exports.login = async function login(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                if (user.password == data.password) {
                    let uniqueId = user['_id'];
                    let token = jwt.sign(
                        { payload: uniqueId }, screateKey.JWT_KEY
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

module.exports.isAuthorised = function isAuthorised(roles) {
    return function (req, res, next) {
        if (roles.includes(req.role) == true) {
            next();
        } else {
            res.status(401).json({
                message: 'Operastion Not allowed'
            })
        }
    }
}


// ProtectRoute
module.exports.protectRouter = async function protectRouter(req, res, next) {
    try {
        let token;
        if (req.cookies.login) {
            console.log(req.cookies);
            token = req.cookies.login;
            let payload = jwt.verify(token, screateKey.JWT_KEY);
            if (payload) {
                console.log("payload token", payload);
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;
                console.log(req.role, req.id);
                next();
            } else {
                return res.json({
                    message: "please login again",
                });
            }
        } else {
            //browser
            const client = req.get('User-Agent');
            if (client.includes("Mozilla") == true) {
                return res.redirect('/login');
            }
            //postman
            res.json({
                message: "please login",
            });
        }
    } catch (err) {
        return res.json({
            message: err.message,
        });
    }
};


// Forget Password
// resetPassword, forgetPassword
module.exports.forgetPassword = async function forgetPassword(req, res) {
    let { email } = req.body;
    try {
        const user = await userModel.findOne({ email: email })
        if (user) {
            const resetToken = user.createResetToken();
            // http://abc.com/resetpassword/resettoken
            let resetPasswordLink = `${req.protocol}://${req.get("host")}/resetpassword/${resetToken}`
            // send email to the user using nodemailer
        } else {
            res.json({
                message: "Please SignUp . . ."
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// resetPassword
module.exports.resetPassword = async function resetPassword(req, res) {
    try {
        const token = req.parma.token;
        let { password, confirmPassword } = req.body;
        const user = await userModel.findOne({ resetToken: token })
        if (user) {
            //resetPasswordHandler will update user's password in db
            user.resetPasswordHandler(password, confirmPassword);
            await user.save();
            res.json({
                message: "password changed succesfully, please login again",
            });
        } else {
            res.json({
                message: "user not found",
            });
        }
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

module.exports.logOut = function logOut(req, res) {
    console.log("For Logout")
    res.cookie('login', ' ', { maxAge: 1 });
    res.json({
        message: "User logged out succesfully"
    })

}