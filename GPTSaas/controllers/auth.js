const User= require('../models/User');
const ErrorResponse= require('../utils/errorResponse');

const sendToken= (user, statusCode, res) => {
    const token= user.getSignedJwtToken(res);
    res.status(statusCode).json({success: true, token});
}

exports.register= async(req, res, next)=> {
    const {username, email, password}= req.body;

    const existingUser_email= await User.findOne({email});

    if(existingUser_email)
        return next(new ErrorResponse("Email already registered", 400));

    try{
        const user= await User.create({username, email, password});
        sendToken(user, 201, res);
    }
    catch(err){
        next(err);
    }
}

exports.login = async(req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse("Please enter email/ password", 400));
    }

    try {
        // Include the password field in the query
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        // Check if password matches
        const isMatch = await user.matchPasswords(password);
        if (!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        sendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
};

exports.logout = async(req, res, next) => {
    res.clearCookie('refreshToken');
    return res.status(200).json({success:true, message:"Logged out"});
}