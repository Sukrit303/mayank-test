const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin")

exports.isAuthenticatedUser =  async (req, res, next) => {
    const token = req.header("x-authToken")

    if(!token) {
        return next(new ErrorHandler('Login first to access this resource.', 401))
    }
    const decoded = jwt.verify(token, process.env.jwtSecret)
    
    req.user = await Admin.findById(decoded.id);
    next();
}

exports.roleValidation = async (req, res, next) => {
    try {
        let user = req.user;

        if(user.role == 'admin') {
            next();
        } else {
            return next(new ErrorHandler("You don't have permission to access these routes", 403))
        }
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
}

exports.allRoleValidation = async (req, res, next) => {
    try {
        let user = req.user;
        if(user.role == 'admin' || user.role == 'organiser') {
            next();
        } else {
            return next(new ErrorHandler("You don't have permission to access these routes", 403))
        }
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
}
