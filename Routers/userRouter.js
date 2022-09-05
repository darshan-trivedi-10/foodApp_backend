const express = require('express');
const userRouter = express.Router();
// const userModel = require('../Modles/userModel')
// const cookieParser = require('cookie-parser')
const { getUser, getAllUser, updateUser, deleteUser, } = require('../controller/UserController');
const { singup, login, isAuthorised, resetPassword, forgetPassword, logOut, protectRouter } = require('../controller/AuthController')

// User Options

userRouter.route('/:id')
    .patch(updateUser)
    .delete(deleteUser)
userRouter
    .route('/signup')
    .post(singup)
userRouter
    .route('/login')
    .post(login)

// multer for fileupload
// uplode -> store, filter,    

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public / images')
    },
    filename: function (req, file, cb) {
        cb(null, `user-${Date.now()}.jpeg`)
    }
})

const filter = function(req, file, cb)
{
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    }else{
        cb(new Error('Not an Image! Please upload an Image'));
    }
}

userRouter.use(protectRouter);
userRouter
    .route('/userProfile')
    .get(getUser)



userRouter
    .route('/forgetpassword')
    .post(forgetPassword)


userRouter
    .route('/resetpassword/:token')
    .post(resetPassword)

userRouter.route('/logout')
    .get(logOut);


userRouter.use(isAuthorised(['admin']))
userRouter
    .route('/')
    .get(getAllUser)

module.exports = userRouter;