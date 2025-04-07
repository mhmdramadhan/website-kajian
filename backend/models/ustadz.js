const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Ustadz = sequelize.define('Ustadz', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  kontak: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'ustadz'
});

module.exports = Ustadz;
