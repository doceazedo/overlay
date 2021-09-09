import pkg from 'sequelize';
const { Sequelize, DataTypes } = pkg;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

export const Setting = sequelize.define('Setting', {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  value: {
    type: DataTypes.STRING
  },
}, {
  sequelize
});