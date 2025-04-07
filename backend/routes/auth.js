const express = require('express');
const router = express.Router();
const { login, register} = require('../controllers/authController');
const { auth, isAdmin } = require('../middlewares/authMiddleware');

router.post('/login', login);
router.post('/register', auth, isAdmin, register);

module.exports = router;
