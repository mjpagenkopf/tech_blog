const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth'); 

//POST REQUEST TO CREATE COMMENT ON BLOG PAGE
router.post('/', withAuth, (req, res) => { 
  
  if (req.session) {
     Comments.create({
        user_post: req.body.user_post,
        blog_id: req.body.blog_id,
        user_id: req.session.user_id
      })
      .then(commentData => res.json(commentData)).catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
    }
});

//DELETE REQUEST TO DELETE COMMENT - CAN ONLY DELETE ONE'S OWN COMMENTS
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comments.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router