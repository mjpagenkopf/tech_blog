const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth'); 

//POST REQUEST FOR CREATING NEW BLOG
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

//DELETE REQUEST TO DELETE BLOG
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!blogData) {
      res.status(404).json({ message: "No blog found with this id" });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;



// router.post('/blog/:id', async (req, res) => {
//   try {
//     const blogData = await Blog.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });
//     // We use .get({ plain: true }) on the object to serialize it so that it only includes the data that we need. 
//     const blog = blogData.get({ plain: true });

//     res.render('blog', {...blog, logged_in: req.session.logged_in});
//   } catch (err) {
//     res.status(501).json(err);
//   }
// });

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const blogData = await Blog.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!blogData) {
//       res.status(404).json({ message: 'No blog found with this id!' });
//       return;
//     }

//     res.status(200).json(blogData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


