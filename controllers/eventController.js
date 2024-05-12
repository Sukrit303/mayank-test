const ErrorHandler = require("../utils/errorHandler")
const Events = require('../models/event');
const Admin = require('../models/admin');
const cloudinary = require('cloudinary')

exports.addEvents = async (req, res, next) => {
    try {
        let { title, description, studentCordinator, facultyCordinator, amitianPrice, nonAmitianPrice, status, organiserEmail, image } = req.body;

        let adminData = req.user;

        let event;

        const result = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: 'events',
        })

        //Check 
        if (title == "" || description == "" || studentCordinator == [] || facultyCordinator == [] || status == "" || amitianPrice == "" || nonAmitianPrice == "") {
            return next(new ErrorHandler('Please Provide Valid Details', 403));
        }

        const organiser = req.user;

        if (organiser.role == 'admin') {
            if (organiserEmail == "") {
                return next(new ErrorHandler('Please provide organiser email', 400))
            }
            const organiserData = await Admin.findOne({ email: organiserEmail });
            if (!organiserData) {
                return next(new ErrorHandler('Please provide valid organiser email id', 400))
            }
        }

        if (organiser.role == 'organiser') {
            organiserEmail = organiser.email;
        }

        let eventId = 1
        const eventData = await Events.find();

        if (eventData.length == 0) {
            eventId = 1
        } else {
            eventId = eventId + eventData.length
        }

        if (adminData.role == 'admin') {
            event = await Events.create({
                eventId,
                title,
                description,
                studentCordinator,
                image: {
                    public_id: result.public_id,
                    url: result.secure_url
                },
                facultyCordinator,
                amitianPrice,
                nonAmitianPrice,
                organiserEmail,
                status: "approved"
            })
        } else {
            event = await Events.create({
                eventId,
                title,
                description,
                studentCordinator,
                
                image: {
                    public_id: result.public_id,
                    url: result.secure_url
                },
                facultyCordinator,
                amitianPrice,
                nonAmitianPrice,
                organiserEmail
            })
        }

        res.status(200).json({
            success: true,
            message: "Event register Successfully",
            data: event
        })
    } catch (err) {
        return next(new ErrorHandler(err.message, 500))
    }
}

exports.updateEvent = async (req, res, next) => {
    try {
        let eventId = req.params.id
        const event = await Events.findByIdAndUpdate(eventId, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({
            success: true,
            data: event
        })
    } catch (err) {
        return next(new ErrorHandler(err.message, 500))
    }
}

exports.getAllEvents = async (req, res, next) => {
    try {

        let { amitian } = req.query;
        let eventData;
        let data = []

        if (amitian == "true") {
            eventData = await Events.find({ status: "approved" })
            eventData.map((event) => {
                data.push({
                    eventId: event.eventId,
                    title: event.title,
                    price: event.amitianPrice,
                    studentCordinator: event.studentCordinator,
                    facultyCordinator : event.facultyCordinator,
                    image:  event.image,
                    description: event.description

                })
            })
        } else if(amitian == "false"){
            eventData = await Events.find({ status: "approved" })
            eventData.map((event) => {
                data.push({
                    eventId: event.eventId,
                    title: event.title,
                    price: event.nonAmitianPrice,
                    studentCordinator: event.studentCordinator,
                    facultyCordinator : event.facultyCordinator,
                    image:  event.image,
                    description: event.description

                })
            })
        }

        res.status(200).json({
            success: true,
            data: data
        })

    } catch (err) {
        return next(new ErrorHandler(err.message, 500))
    }
}

exports.deleteEvents = async (req, res, next) => {
    try {
        const eventId = req.params.id
        const deleteEvent = await Events.findByIdAndDelete(eventId)
        if (!deleteEvent) {
            return next(new ErrorHandler(`Event not found with this id: ${req.params.id}`));
        }
        res.status(200).json({
            success: true,
            data: deleteEvent,
            message: "Event deleted successfully"
        })

    } catch (err) {
        return next(new ErrorHandler(err.message, 500))
    }
}

exports.getSingleEvents = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const singleEvent = await Events.findById(eventId);
        if (!singleEvent) {
            return next(new ErrorHandler(`Event not found with this id: ${req.params.id}`));
        }
        res.status(200).json({
            success: true,
            data: singleEvent
        })
    } catch (err) {
        return next(new ErrorHandler(err.message, 500))
    }
}

exports.getOrganiserEvents = async (req, res, next) => {
    try {
        const userChecker = req.user;
        let event;
        let { eventStatus } = req.query;
        let count;


        if (userChecker.role == 'organiser') {
            organiserEmail = userChecker.email
            if (eventStatus == 'all') {
                event = await Events.find({ organiserEmail: organiserEmail });
                count = event.length;
            } else {
                event = await Events.find({ organiserEmail: organiserEmail, status: eventStatus });
                count = event.length;
            }
        }
        if (userChecker.role == 'admin') {
            if (eventStatus == "all") {
                event = await Events.find();
                count = event.length;
            } else {
                event = await Events.find({ status: eventStatus });
                count = event.length;
            }
        }
        res.status(200).json({
            success: true,
            data: event,
            count: count
        })
    } catch (err) {
        return next(new ErrorHandler(err.message, 500))
    }
}

