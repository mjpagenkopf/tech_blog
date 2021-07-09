const router = require('express').Router();
const { Blog, User, Comments } = require('../models');
const withAuth = require('../utils/auth');

//GET REQUEST TO LOAD ALL BLOGS ON HOMEPAGE
router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: Comments,
          attribute: [
            'id',
            'user_post',
            'blog_id',
            'user_id'
          ],
          include: {
            model: User,
            attributes: [
              'name'
            ]
          }
        },
      ],
    });
    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    // Send over the 'logged_in' session variable to the 'homepage' template
    res.render('homepage', { blogs, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(502).json(err);
  }
});

//GET REQUEST TO CREATE SINGLE BLOG PAGE
router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['name']
      },
      {
        model: Comments,
        attributes: [
        'id',
        'user_post',
        'blog_id',
        'user_id'
        ],
        include: {
            model: User,
            attributes: ['name']
        },
      },
    ]
  });
    const blog = blogData.get({ plain: true });
    console.log(blog)

    res.render('blog', {...blog, logged_in: req.session.logged_in});
  } catch (err) {
    res.status(501).json(err);
  }
});

//GET REQUEST FOR LOADING DASHBOARD PAGE
//Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
   try {
// Find the logged in user based on the session ID
const userData = await User.findByPk(req.session.user_id, {
      include: [{
        model: Blog
      }],
     });

    const user = userData.get({ plain: true });
    
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(504).json(err);
  }
});

//GET REQUEST FOR LOGIN
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  } else {
    res.render('login');
  }
});

//GET REQUEST TO LOGOUT AND SENDS TO LOGIN PAGE
router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/login');
      return;
    })

  }
})

module.exports = router;
