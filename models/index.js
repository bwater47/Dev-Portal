// Import the Models
const Users = require('./Users');
const Post = require('./Post');
const Comment = require('./Comment');

// Post belongs to Users
Post.belongsTo(Users, {
  foreignKey: 'Users_id',
  onDelete: 'CASCADE',
});
// Users have many Posts
Post.hasMany(Comment, {
  foreignKey: 'Post_id',
  onDelete: 'CASCADE',
});
// Users have many Comments
Comment.belongsTo(Users, {
  foreignKey: 'Users_id',
  onDelete: 'CASCADE',
});
// Comments belong to Users
Comment.belongsTo(Post, {
  foreignKey: 'Post_id',
  onDelete: 'CASCADE',
});

// Export the models
module.exports = { Users, Post, Comment };
