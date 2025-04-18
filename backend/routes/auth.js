const express = require('express');
const router = express.Router();
const { login, register, me } = require('../controllers/authController');
const { auth, isAdmin } = require('../middlewares/authMiddleware');

router.post('/login', login);
router.post('/register', auth, isAdmin, register);
router.get('/me', auth, me);
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout berhasil' });
});

module.exports = router;
