const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

// @desc     Show bootcamps
// @route    GET/api/v1/bootcamps
// @acces    Public
exports.getBootcamps = asyncHandler( async (req, res, next) => {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({success: true, data: bootcamps})
});

// @desc     Show bootcamps
// @route    GET/api/v1/bootcamps/:id
// @acces    Public
exports.getBootcamp = asyncHandler( async (req, res, next) => {
        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp) {
            return next(new ErrorResponse(`Resource with id ${res.params.id} can not be found`, 404))
        }
        res.status(200).json({success: true, data: bootcamp})
});

// @desc     Create bootcamp
// @route    POST/api/v1/bootcamps
// @acces    Private
exports.createBootcamp = asyncHandler( async (req, res, next) => {
        const bootcamp = await Bootcamp.create(req.body)

        res.status(201).json({
            success: true,
            body: bootcamp
        })
   
});

// @desc     Update bootcamp
// @route    PUT/api/v1/bootcampS/:id
// @acces    Private
exports.updateBootcamp = asyncHandler( async (req, res, next) => {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if(!bootcamp) {
            return next(new ErrorResponse(`Resource with id ${res.params.id} can not be found`, 404))
        }
        res.status(200).json({success: true, data: bootcamp})
});

// @desc     Delete bootcamp
// @route    DELETE/api/v1/bootcamps/:id
// @acces    Private
exports.deleteBootcamp = asyncHandler( async (req, res, next) => {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
        if(!bootcamp) {
            return next(new ErrorResponse(`Resource with id ${res.params.id} can not be found`, 404))
        }
        res.status(200).json({success: true, data: []})
});