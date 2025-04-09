const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { auth, authorizeRole, authorizeUstadzSelfOnly } = require('../middlewares/authMiddleware');

router.get('/admin-overview', auth, authorizeRole(['admin']),
    dashboardController.adminOverview);
router.get('/ustadz-overview', auth, authorizeUstadzSelfOnly, authorizeRole(['ustadz']),
    dashboardController.ustadzOverview);

module.exports = router;