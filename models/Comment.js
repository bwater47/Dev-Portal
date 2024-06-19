// This model will be used to create the Comment table in the database.
const { Model, DataTypes } = require('sequelize');
// Import the connection to the database
const sequelize = require('../config/connection');
// This is the Comment model that extends the Sequelize Model.
class Comment extends Model {}
// The Comment model has two columns: an id column and a comment_text column.
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Post',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    modelName: 'Comment',
  }
);

module.exports = Comment;
