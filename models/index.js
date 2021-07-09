const User = require('./User');
const Blog = require('./Blog');
const Comments = require('./Comments');
// const CommentThrough = require('./CommentThrough');

User.hasMany(Blog, { //Blog.belongsTo(User, .... this is what it was)
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Blog.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Comments.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Comments.belongsTo(Blog, {
  foreignKey: "blog_id",
  as: "comments"
});

User.hasMany(Comments, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Blog.hasMany(Comments, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
});


module.exports = { User, Blog, Comments }; //CommentThrough
