// Create a new model for the Post table.
const { Model, DataTypes } = require('sequelize');
// Import the connection to the database.
const sequelize = require('../config/connection');
// This is the Post model that extends the Sequelize Model.
class Post extends Model {}

// Define the columns in the Post table.
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    modelName: 'Post',
  }
);

module.exports = Post;
