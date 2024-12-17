import express from 'express';
import Blog from '../models/blog.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/user.js';
import passport from 'passport';

const router = express.Router();

// @route GET api/blogs
// @description Get all blogs
// @access Public
router.get('/blogs', (req, res) => {
    Blog.find({})
      .sort({ date: -1 })
      .then(blogs => res.json(blogs))
      .catch(err => res.status(400).json({ error: 'Unable to render blog posts' }))
})

// @route GET api/blogs/latest
// @description Get the latest blog
// @access Public
router.get('/blogs/latest', (req, res) => {
  Blog.findOne().sort({ date: -1 })
      .then(blog => {
          if (blog) {
              res.json(blog);
          } else {
              res.json({ num: 0 }); // Return an empty blog object with num set to 0
          }
      })
      .catch(err => {
          console.error('Error in /blogs/latest:', err);
          res.status(400).json({ error: `Unable to render latest blog post. Error: ${err.message}` });
      });
});


// @route GET api/blogs/:id
// @description Get a single blog by id
// @access Public
router.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id)
      .then(blog => res.json(blog))
      .catch(err => res.status(400).json({ error: 'Unable to render blog post, woah' }))
})

// @route POST api/admin
// @description Create a new blog
// @access Admin
router.post('/admin', passport.authenticate('jwt', { session: false }), (req, res) => {
    Blog.create(req.body)
      .then(blog => res.json({ msg: 'Blog added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to add blog' }));
})

// @route PUT api/admin
// @description Update a previous blog
// @access Admin
router.put('/admin/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedBlog) => res.json(updatedBlog))
    .catch((err) => res.status(400).json({ error: 'Unable to update blog' }));
});

// @route DELETE api/admin
// @description Delete a blog by number
// @access Admin
router.delete('/admin/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
      const blogToDelete = await Blog.findById(req.params.id);
      if (!blogToDelete) {
          return res.status(404).json({ error: 'Blog not found' });
      }

      const deletedBlogNum = blogToDelete.num;
      await blogToDelete.delete();

      // Decrement the numbers of all blogs with numbers greater than the deleted blog's number
      await Blog.updateMany({ num: { $gt: deletedBlogNum } }, { $inc: { num: -1 } });

      res.json({ msg: 'Blog deleted successfully' });
  } catch (err) {
      res.status(400).json({ error: 'Unable to delete blog' });
  }
});

// @route GET api/isAdmin
// @description Check if the user is logged in
// @access Private (needs to be logged in)
router.get('/isAdmin', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAdmin: true });
  } else {
    res.json({ isAdmin: false });
  }
});

// @route POST api/login/
// @description Login with username and password
// @access Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Validate password (use hash comparison)
    const isMatch = crypto.timingSafeEqual(
      Buffer.from(user.hashedPassword, 'hex'),
      crypto.pbkdf2Sync(password, user.salt, 310000, 32, 'sha256')
    );

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, username: user.username}, // Payload
      process.env.DEVELOPMENT_SESSION_SECRET,
      { expiresIn: '1h' } // Expiration
    );

    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// @route GET api/logout
// @description Logout the user
// @access Private (needs to be logged in)
router.get('/logout', (req, res) => {
  // Log the user out
  req.logout();
  req.session.destroy();
  res.json({ message: 'Logout successful' });
});


export default router;

