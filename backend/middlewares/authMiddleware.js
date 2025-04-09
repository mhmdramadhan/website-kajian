const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { Kajian, Blog } = require('../models');

exports.auth = (req, res, next) => {
  const token = req.cookies.token;
  // console.log(req.cookies);
  
  if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Token tidak valid' });
  }
};

exports.authorizeRole = (roles = []) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: You don’t have permission' });
    }
    next();
  };
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Hanya admin yang diizinkan' });
  next();
};

exports.isUstadz = (req, res, next) => {
  if (req.user.role !== 'ustadz') return res.status(403).json({ message: 'Hanya ustadz yang diizinkan' });
  next();
};

// Untuk endpoint: /ustadz/:id (edit profil ustadz)
exports.authorizeUstadzSelfOnly = async (req, res, next) => {
  const user = req.user;
  const ustadzIdFromParam = parseInt(req.params.id, 10);

  if (user.role === 'admin') return next(); // admin boleh akses semua

  if (user.role === 'ustadz' && user.ustadzId === ustadzIdFromParam) {
    return next(); // ustadz hanya bisa akses datanya sendiri
  }

  return res.status(403).json({ message: 'Forbidden: Not your data' });
};

// kajian middleware
exports.authorizeKajianOwner = async (req, res, next) => {
  const user = req.user;
  const kajianId = parseInt(req.params.id, 10);

  try {
    const kajian = await Kajian.findByPk(kajianId);
    if (!kajian) return res.status(404).json({ message: 'Kajian not found' });

    if (user.role === 'admin') return next();

    if (user.role === 'ustadz' && kajian.ustadzId === user.ustadzId) {
      return next();
    }

    return res.status(403).json({ message: 'Forbidden: Not your kajian' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// blog middleware

exports.authorizeBlogOwner = async (req, res, next) => {
  const user = req.user;
  const blogId = parseInt(req.params.id, 10);

  try {
    const blog = await Blog.findByPk(blogId);
    if (!blog) return res.status(404).json({ message: 'blog not found' });

    if (user.role === 'admin') return next();

    if (user.role === 'ustadz' && blog.ustadzId === user.ustadzId) {
      return next();
    }

    return res.status(403).json({ message: 'Forbidden: Not your blog' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};
