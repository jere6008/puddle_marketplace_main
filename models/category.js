const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: [true, "Category name is required"],
        lowercase: true
    },
    category_description: {
        type: String,
        required: [true, "Category description is required"],
    },
    category_img: {
        type: String,
        required: false,
        default: 'https://picsum.photos/500/500'
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;