import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: String,
    author: { type: String, default: "Luke" },
    body: String,
    description: String,
    tags: Array,
    date: { type: String, default: () => new Date(Date.now()).toLocaleDateString() },
    hidden: { type: Boolean, default: false },
    id: Number
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;

