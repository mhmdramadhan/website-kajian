const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token tidak ditemukan' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Token tidak valid' });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Hanya admin yang diizinkan' });
  next();
};

exports.isUstadz = (req, res, next) => {
  if (req.user.role !== 'ustadz') return res.status(403).json({ message: 'Hanya ustadz yang diizinkan' });
  next();
};
