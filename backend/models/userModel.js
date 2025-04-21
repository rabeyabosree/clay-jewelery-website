const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
        unique: true,
        trim: true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8 
    },
    profileImage:{String},
    bio:{String},
    resetPasswordCode: {
        type: String,
    },
    resetCodeExpires: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true                                            
    }
});

const User = mongoose.model("User", userSchema); 
module.exports = User;