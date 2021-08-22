const mongoose = require('mongoose')
const slugify = require('slugify')

const BootcampSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'This field can not be empty'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not contain more than 50 characters']
    },

    slug: String,

    description: {
        type: String,
        required: [true, 'This field can not be empty'],
        maxlength: [500, 'Name can not contain more than 500 characters']
    },

    website: {
        type:String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please enter valid URL with http:// or https://'
        ]
    },

    email: {
        type: String,
        match: [
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            'Please enter valid email address'
        ]
    },

    phone: {
        type: String
    },

    address: 
    {
        type: String,
        required: [true, 'This field can not be empty']
    },

    location: {
        //GeoJSON point
        type: {
          type: String,
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
      },

      careers: {
          type: [String],
          required: true,
          enum: [
            "Mobile Development",
			"Web Development",
			"Data Science",
			"Business",
            "UI/UX"
          ]
      },

      averageRating: {
          type: Number,
          min: [1, 'Minimal value of this field is 1'],
          max: [10, 'Maximal value of this field is 10']
      },

      averageCost: Number,

      photo:{
        type: String,
        default: 'no-photo.jpg'
      },

      housing: {
          type: Boolean,
          default: false
      },

      housing: {
        type: Boolean,
        default: false
    },

      housing: {
        type: Boolean,
        default: false
    },

      housing: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

BootcampSchema.pre('save', function(next) {
    this.slug = slugify(this.name, {lower: true})
    next()
})

module.exports = mongoose.model('Bootcamp', BootcampSchema)

