import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    description: String,
    tags: Array,
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    id: Number
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;