const mongoose = require('mongoose');
const ErrorResponse = require('../utils/errorResponse');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add course title']
    },

    description: {
        type: String,
        required: [true, 'Please add course description']
    },

    weeks: {
        type: String,
        required: [true, 'Please add course duration in weeks']
    },

    tuition: {
        type: Number,
        required: [true, 'Please add tuition cost']
    },

    minimumSkill: {
        type: String,
        required: [true, 'Please add minimum skill'],
        enum: ['beginner', 'intermediate', 'advanced']
    },

    scholarhipsAvailable: {
        type: Boolean,
        required: [true, 'Please add scholarships availability']
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

CourseSchema.statics.getAverageCost = async function(bootcampId) {
    const obj = await this.aggregate([
        {
        $match: { bootcamp: bootcampId}
        },
        {
        $group: 
        {
            _id: '$bootcamp',
            averageCost: { $avg: '$tuition'}
        }
    }
    ]);
    try{
        await this.model('Bootcamp').findByIdAndUpdate(bootcampId, 
            {
                _id: bootcampId,
                averageCost: Math.ceil(obj[0].averageCost / 10) * 10
            });
    } catch(err) {
        console.log(err)
    }

}

CourseSchema.post('save', function() {
    this.constructor.getAverageCost(this.bootcamp);
});

CourseSchema.pre('remove', function() {
    this.constructor.getAverageCost(this.bootcamp);
})

module.exports = mongoose.model('Course', CourseSchema)