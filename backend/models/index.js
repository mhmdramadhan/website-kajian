const sequelize = require('../config/db');
const User = require('./user');
const Ustadz = require('./ustadz');
const Kajian = require('./kajian');
const Blog = require('./blog');

// Relasi User ↔️ Ustadz
User.belongsTo(Ustadz, { foreignKey: 'ustadzId', as: 'ustadz' });

// Relasi Kajian ↔️ Ustadz
Kajian.belongsTo(Ustadz, { foreignKey: 'ustadzId', as: 'ustadz' });
Ustadz.hasMany(Kajian, { foreignKey: 'ustadzId' }); // <— Tambahkan ini

// Relasi Kajian ↔️ User (pembuat kajian)
Kajian.belongsTo(User, { as: 'creator', foreignKey: 'createdBy' });
User.hasMany(Kajian, { foreignKey: 'createdBy', as: 'kajian_created' }); // opsional

// Relasi Blog ↔️ Ustadz
Blog.belongsTo(Ustadz, { foreignKey: 'ustadzId', as: 'ustadz' });
Ustadz.hasMany(Blog, { foreignKey: 'ustadzId' }); // <— Tambahkan ini

// Relasi Blog ↔️ User (penulis blog)
Blog.belongsTo(User, { as: 'creator', foreignKey: 'createdBy' });
User.hasMany(Blog, { foreignKey: 'createdBy', as: 'blog_created' }); // opsional

module.exports = {
  sequelize,
  User,
  Ustadz,
  Kajian,
  Blog
};
