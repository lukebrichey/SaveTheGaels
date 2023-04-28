import express from 'express';
import Blog from '../models/blog.js';
import passport from 'passport';

const router = express.Router();

// @route GET api/blogs
// @description Get all blogs
// @access Public
router.get('/blogs', (req, res) => {
    Blog.find({})
      .then(blogs => res.json(blogs))
      .catch(err => res.status(400).json({ error: 'Unable to render blog posts' }))
})

// @route GET api/blogs/latest
// @description Get the latest blog
// @access Public
router.get('/blogs/latest', (req, res) => {
    Blog.findOne({}).sort({ id: -1 })
      .then(blog => res.json(blog))
      .catch(err => res.status(400).json({ error: 'Unable to render latest blog post' }))
})

// TODO: Need to add access control

// @route POST api/admin
// @description Create a new blog
// @access Admin
router.post('/admin', (req, res) => {
    console.log(req.body)
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

// @route DELETE api/admin
// @description Delete a blog by number
// @access Admin
router.delete('/admin/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id, req.body) 
      .then(blog => res.json({ msg: 'Blog deleted successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to delete blog' }));
})

// @route GET api/check-admin-status
// @description Check if the user is logged in
// @access Private (needs to be logged in)
router.get('/isAdmin', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAdmin: true });
  } else {
    res.json({ isAdmin: false });
  }
});

// @route POST api/login/password
// @description Login with username and password
// @access Admin
router.post('/login/password', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      // Redirect to the login page on failure
      // Should instead just add notification component to login modal
      return res.redirect('/login');
    }

    req.logIn(user, (err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      
      // Store the user ID in the session
      req.session.userId = user._id;

      // Log success message to the console
      console.log(`User "${user.username}" successfully logged in.`);

      // Redirect to the home page on success
      return res.redirect('/');
    });
  })(req, res, next);

});



export default router;

