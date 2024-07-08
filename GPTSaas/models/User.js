const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minLength: [6, "Password must be at least 6 characters long"],
        select: false,
    },
    customerId: {
        type: String,
        default: "",
    },
    subscription: {
        type: String,
        default: ""
    },
});
 
// Middleware to hash the password before saving the user
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to match passwords
userSchema.methods.matchPasswords = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Method to generate JWT token
userSchema.methods.getSignedJwtToken = function(res) {
    const accessToken = jwt.sign(
        { id: this._id },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRE }
    );

    const refreshToken = jwt.sign(
        { id: this._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRE }
    );

    res.cookie('refreshToken', `${refreshToken}`, {
        maxAge: 86400 * 7000, // 7000 days in milliseconds
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // ensure cookies are sent over HTTPS only in production
        sameSite: 'strict'
    });

    return { accessToken, refreshToken };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
