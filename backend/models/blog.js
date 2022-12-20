import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const blogSchema = new Schema({
    title: String,
    author: String,
    body: String,
    tags: Array,
    date: { type: Date, default: Date.now },
    hidden: Boolean
});

const Blog = new model('Blog', blogSchema);

export default Blog