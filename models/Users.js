// Importing important parts of sequelize library.
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
// User model (table) by extending off Sequelize's Model class.
class Users extends Model {
  // Set up method to run on instance data (per user) to check password.
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
// This is the model for the Users table in the database, which includes the id, username, email, and password fields.
Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    // Hooks are automatic methods that run during various phases of the Users Model lifecycle so this hook will automatically hash the password before it is created in the database.
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    // These are table configuration options to go along with the model. In this case, we want the model name to be 'Users' and we want the table name to be 'users' and we want the table name to be pluralized.
    sequelize,
    freezetablename: true,
    underscored: true,
    timestamps: false,
    modelName: 'Users',
  }
);

module.exports = Users;
