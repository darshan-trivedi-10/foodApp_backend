// MongoDB 
const mongoose = require('mongoose');

const db_link = 'MONGODB_LINK';
mongoose.connect(db_link)
    .then(function (db) {
        console.log('Plan db connected')
    })
    .catch(function (err) {
        console.log(err)
    })

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        maxLength: [20, 'Plan Name Should not exceed more than 20 characters']
    },
    duration: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: [true, 'Price Not Entered']
    },
    avgRating: {
        type: Number,
    }, discount: {
        type: Number,
        validate: [function () {
            return this.discount < 100;
        }, 'discount should not exceed price']
    }
});


const planModel = mongoose.model('planModel', planSchema);


module.exports = planModel;
