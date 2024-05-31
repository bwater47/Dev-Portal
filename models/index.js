const Users = require('./Users');
const Post = require('./Post');
const Comment = require('./Comment');


Post.belongsTo(Users, {
    foreignKey: 'Users_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Users, {
    foreignKey: 'Users_id',
    onDelete: 'CASCADE'
});

module.exports = { Users, Post, Comment };