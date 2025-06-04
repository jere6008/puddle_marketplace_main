const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: [true, "User id is required"]
    },
    cart: {
        type: [],
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    cartStatus: {
        type: String,
        required: false,
        default: 'pending'
    },
    isNotified: {
        type: Boolean,
        required: false,
        default: false
    },
    address: {
        type: [],
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;