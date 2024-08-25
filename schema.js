const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostReact = new Schema({
    title: {
        type: String,
        required: true
    },
    sector: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    }
}, { timestamps: true });

// const blogpostcollectionName
const BlogPostModel = mongoose.model('BlogPostReact', BlogPostReact, 'blogsReact');
module.exports = BlogPostModel;