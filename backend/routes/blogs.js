import express from 'express';
import Blog from '../models/blog.js';

const router = express.Router();

// @route GET api/blogs
// @description Get all blogs
// @access Public
router.get('/blogs', (req, res) => {
    Blog.find({})
      .then(blogs => res.json(blogs))
      .catch(err => res.status(400).json({ error: 'Unable to render blog posts' }))
})

// TODO: Need to add access control

// @route POST api/admin
// @description Create a new blog
// @access Admin
router.post('/admin', (req, res) => {
    Blog.create(req.body)
      .then(blog => res.json({ msg: 'Blog added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to add blog' }));
})

// @route PUT api/admin
// @description Update a previous blog
// @access Admin
// TODO: determine how id will work with front end (maybe just add a number that
// auto increments, keeps track of blogs)
router.put('/admin/:id', (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body)
      .then(blog => res.json({ msg: 'Blog updated successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to update blog' }));
})

// @rout DELETE api/admin
// @description Delete a blog by number
// @access Admin
router.delete('/admin/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id, req.body) 
      .then(blog => res.json({ msg: 'Blog deleted successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to delete blog' }));
})

// router.post('/login', (req, res) => {
    
// })

export default router;

