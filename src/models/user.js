import { Sequelize, DataTypes } from 'sequelize';
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

export const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  pronouns: {
    type: DataTypes.STRING
  },
  team: {
    type: DataTypes.STRING
  }
}, {
  sequelize
});