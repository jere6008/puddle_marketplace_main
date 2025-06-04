const NewsLetter = require("../models/newsletter");
const Feedback = require('../models/feedback');

module.exports.subscribe = (async (req, res) => {
    try {
        const { email } = req.body;

        const letter = await NewsLetter.create({ email });

        res.status(200).json({
            success: "Successfully subscribed to the news letter"
        });


    } catch (error) {
        res.render('404');
    }
});

// Send feedback
module.exports.feedback = (async (req, res) => {
    try {
        const { email, phone, feedback } = req.body

        await Feedback.create({email, phone, feedback});


        res.status(200).json({
            success: "Feedback received successfully"
        });

    } catch (error) {
        res.status(500).json({
            Error: "Internal server error",
            error
        });
    }
});

// Get feedback
module.exports.feedback_get = (async (req,res) => {
    try {
        const feedback = await Feedback.find({});

        res.status(200).json({
            feedback
        });
    } catch (error) {
        res.status(500).json({
            Error: "Internal server error",
            error
        });
    }
});