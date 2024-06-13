// Import the Models
const Users = require('./Users');
const Post = require('./Post');
const Comment = require('./Comment');

Users.hasMany(Post, {
  foreignKey: 'User_id',
  onDelete: 'CASCADE',
});
// Post belongs to Users
Post.belongsTo(Users, {
  foreignKey: 'User_id',
  onDelete: 'CASCADE',
});
// Users have many Posts
Post.hasMany(Comment, {
  foreignKey: 'Post_id',
  onDelete: 'CASCADE',
});
// Users have many Comments
Comment.belongsTo(Users, {
  foreignKey: 'User_id',
  onDelete: 'CASCADE',
});
// Comments belong to Users

// Export the models
module.exports = { Users, Post, Comment };
