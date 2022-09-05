const mongoose = require('mongoose');

const db_link = 'mongodb+srv://admin:4InyfUCHY1GXF4YW@cluster0.6y6zc6y.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
    .then(function (db) {
        console.log('Plan db connected')
    })
    .catch(function (err) {
        console.log(err)
    })

const reviewScheme = new mongoose.Schema({
    review: {
        type: String,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        require: [true, 'rating is required']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }, user: {
        type: mongoose.Schema.ObjectId,
        ref: 'userModel',
        required: [true, 'review must belong to a user']
    }, plan: {
        type: mongoose.Schema.ObjectId,
        ref: 'planModel',
        required: [true, 'review must belong to a plan']
    }
});

// find, findById, findone 
reviewScheme.pre(/^find/, function (next) {
    this.populated({
        path: 'user',
        select: 'name profileImage'
    }).populated('plan')
    next();
});

const reviewModel = mongoose.model('reviewModel', reviewScheme);

module.exports = reviewModel;