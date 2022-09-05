// MongoDB 
const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const { stringify } = require('querystring');
const crypto = require('crypto');

const db_link = 'mongodb+srv://admin:4InyfUCHY1GXF4YW@cluster0.6y6zc6y.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
    .then(function (db) {
        console.log('db connected')
    })
    .catch(function (err) {
        console.log(err)
    })

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    }, email: {
        type: String,
        require: true,
        unique: true,
        validate: function () {
            return emailValidator.validate(this.email);
        }
    },
    password: {
        type: String,
        require: true,
        minLength: 8
    },
    confirmPassword: {
        type: String,
        require: true,
        minLength: 8,
        validate: function () {
            this.confirmPassword == this.password;
        }
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'restaurantowner', 'deliveryboy'],
        default: 'user'
    },
    profileImage: {
        type: String,
        default: 'img/users/default.jpeg'
    },
    resetToken: String
})

/*
1) Mongose Hook
2) Types of Hooks -- pre, post hooks
3) Implement functionality 
*/

// After save event occurs in db
// save, remove

userSchema.pre('save', function () {
    console.log('Before Saving in Database')
})

userSchema.pre('save', function () {
    this.confirmPassword = undefined;
})

userSchema.post('save', function (doc) {
    console.log('after Saving in Database', doc)
})

// userSchema.pre('save', async function () {
//     let salt = await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password, salt);
//     this.password = hashedString;
//     console.log(hashedString);
// })

userSchema.methods.createResetToken = function () {
    // creating unique token using npm crypto-js
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.resetToken =  resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler = function (password, confirmPassword) {
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.resetToken = undefined;
}


const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;




