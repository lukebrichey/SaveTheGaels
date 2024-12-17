import Blog from './models/blog.js';
import connectDB, { disconnectDB } from './config/db.js';

disconnectDB();

// Connect to MongoDB
connectDB();

// Generate Random Data
const generateRandomBlogs = async (num) => {
    const randomDate = new Date(Date.now() - Math.floor(Math.random() * 5 * 365 * 24 * 60 * 60 * 1000))
        .toISOString()
        .split('T')[0];

    const blogs = [];
    for (let i = 0; i < num; i++) {
        blogs.push({
            title: `Blog Post ${i}`,
            body: "Lorem ipsum dolor sit amet...",
            author: "Luke",
            description: "Test Description",
            tags: ["performance", "index"],
            date: randomDate,
            hidden: false,
            num: i
        });
    }
    return blogs;
};

// Insert Blogs
const runTest = async () => {
    console.time("Insert Time");
    const blogs = await generateRandomBlogs(500000);
    await Blog.insertMany(blogs);
    console.timeEnd("Insert Time");

    console.time("Fetch Sorted Blogs");
    const sortedBlogs = await Blog.find({ hidden: { $in: [true, false] } }).sort({ date: -1 }).limit(100);
    console.timeEnd("Fetch Sorted Blogs");

    // console.log("Top 10 Sorted Blogs:", sortedBlogs);

    // Cleanup: Delete the test blogs
    await Blog.deleteMany({ description: "Test Description" });
    console.log("Test blogs deleted");

    // Disconnect from MongoDB
    disconnectDB();
};

const deleteTestBlogs = async () => {
    await Blog.deleteMany({ description: "Test Description" });
    console.log("Test blogs deleted");
}

runTest();