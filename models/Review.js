const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add review title']
    },

    text: {
        type: String,
        required: [true, 'Please add some text for review']
    },

    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Please add rating from 1 to 10']
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: [true, 'Please add bootcamp id']
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

//Prevent user to leave more than 1 review
ReviewSchema.index({bootcamp: 1, user: 1}, {unique: true});

ReviewSchema.statics.getAverageRating = async function(bootcampId) {
    const obj = await this.aggregate([
        {
        $match: { bootcamp: bootcampId}
        },
        {
        $group: 
        {
            _id: '$bootcamp',
            averageRating: { $avg: '$rating'}
        }
    }
    ]);
    try{
        await this.model('Bootcamp').findByIdAndUpdate(bootcampId, 
            {
                _id: bootcampId,
                averageRating: obj[0].averageRating
            });
    } catch(err) {
        console.log(err)
    }

}

ReviewSchema.post('save', function() {
    this.constructor.getAverageRating(this.bootcamp);
});

ReviewSchema.pre('remove', function() {
    this.constructor.getAverageRating(this.bootcamp);
})

module.exports = mongoose.model('Review', ReviewSchema)