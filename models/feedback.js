const mongoose = require("mongoose");
const { isEmail } = require("validator");

const feedbackSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
    },
    feedback: {
        type: String,
        required: [true, "Feedback is required"]
    },
    status: {
        type: String,
        required: false,
        default: "unread"
    }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;