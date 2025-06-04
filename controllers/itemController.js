// Import required modules
const Item = require('../models/item');
const Order = require('../models/order');
const url = require('url');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const axios = require('axios');

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, process.env.ITEMSECRET, {
        expiresIn: maxAge
    })
}

// Extract the item id from the request url using the url parser module
module.exports.item_get = async (req, res) => {
    let { query } = url.parse(req.url, true)

    try {
        // Find the item by id from the database
        const item = await Item.findById(query.id);

        if (item) {
            // If the item exists a cookie for the item will be made and user redirected to the view route
            const token = createToken(query.id);
            res.cookie('item', token, { httpOnly: true });
            res.redirect('/view')
        } else {
            // if the item does not exist the 404 error template will be rendered
            res.render('404');
        }
    } catch (err) {
        res.render('404');
    }
}

module.exports.all_items = async (req, res) => {
    try {
        const products = await Item.find({});

        res.status(200).json({
            products
        })
    }
    catch (error) {
        res.status(500).json({
            Error: "Internal server error",
            error
        })
    }
};

module.exports.user_orders = (async (req, res) => {
    try {
        const user_id = req.params.id;

        const orders = await Order.find({user_id});

        res.status(200).json({
            orders
        });
    } catch (error) {
        res.status(500).json({
            Error: "Internal server error",
            error
        });
    }
});

module.exports.create_order = (async (req, res) => {
    try {
        const { cart, address, user_id, total } = req.body;

        const order = await Order.create({ user_id, cart, total, address });

        consumeWallieStk(order._id,address[0].phoneField,total);
        informAuthor(cart, total, address);

        
        res.status(200).json({ order: order._id });
    } catch (error) {
        res.status(500).json({
            Error: "Internal server error",
            error
        });
    }
});

module.exports.one_user = async (req, res) => {
    try {
        const _id = req.params.id;

        const user = await User.findOne({ _id });

        if (!user) {
            return res.status(404).json({
                Error: "User not found"
            });
        }

        res.status(200).json({
            user
        });
    } catch (error) {
        res.status(500).json({
            Error: "Internal server error",
            error
        });
    }
};

module.exports.orders_get = (async (req, res) => {
    res.render("orders");
});

module.exports.cancel_order = async (req, res) => {
    try {
        const order_id = req.params.id;

        const order = await Order.findByIdAndUpdate(order_id, { cartStatus: 'cancelled' }, { new: true });
        
        if (!order) {
            return res.status(404).json({
                Error: "Order not found"
            });
        }

        res.status(200).json({
            success: "Order cancelled successfully",
        });
    } catch (error) {
        res.status(500).json({
            Error: "Internal server error",
            error
        });
    }
};

const consumeWallieStk = ((order_id, phone, amount) => {
    const url = "http://localhost:3000/payments/checkout";
    axios.post(url, {
        order_id: order_id,
        phone: phone,
        amount: amount
    }).then((response) => {
        console.log(response);
    })
});

const informAuthor = ((cart, total, address) => {
    const url = "http://localhost:3000/mail/inform";
    axios.post(url, {
        cart, total, address
    },
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
).then((response) => {
    console.log(response);
})
})