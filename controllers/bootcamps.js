const Bootcamp = require('../models/Bootcamp');

// @desc     Show bootcamps
// @route    GET/api/v1/bootcamps
// @acces    Public
exports.getBootcamps = async (req, res, next) => {

    try{
        const bootcamps = await Bootcamp.find();
        res.status(200).json({success: true, data: bootcamps})
    }
    catch(err){
        res.status(400).json({success: false, message: err.message})
    }
};

// @desc     Show bootcamps
// @route    GET/api/v1/bootcamps/:id
// @acces    Public
exports.getBootcamp = async (req, res, next) => {
    try{
        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp) {res.status(400).json({success: false})}
        res.status(200).json({success: true, data: bootcamp})
    }
    catch(err){
        res.status(400).json({success: false, message: err.message})
    }
};

// @desc     Create bootcamp
// @route    POST/api/v1/bootcamps
// @acces    Private
exports.createBootcamp = async (req, res, next) => {
    try{
        const bootcamp = await Bootcamp.create(req.body)

        res.status(201).json({
            success: true,
            body: bootcamp
        })
    }
    catch(err)
    {
        res.status(400).json({ 
            success: false,
            message: err.message
         })
    }
};

// @desc     Update bootcamp
// @route    PUT/api/v1/bootcampS/:id
// @acces    Private
exports.updateBootcamp = async (req, res, next) => {
    try{
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if(!bootcamp) { res.status(400).json({success: 'false'})}
        res.status(200).json({success: true, data: bootcamp})
    }
    catch(err)
    {
        res.status(400).json({sucess: false})
    }
};

// @desc     Delete bootcamp
// @route    DELETE/api/v1/bootcamps/:id
// @acces    Private
exports.deleteBootcamp = async (req, res, next) => {
    try{
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
        if(!bootcamp) { res.status(400).json({success: 'false'})}
        res.status(200).json({success: true, data: []})
    }
    catch(err)
    {
        res.status(400).json({sucess: false})
    }
};