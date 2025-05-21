const express = require('express');
const router = express.Router();
const kajianController = require('../controllers/kajianController');
const { auth, authorizeRole, authorizeKajianOwner } = require('../middlewares/authMiddleware');
const { uploadKajian } = require('../middlewares/uploadMiddleware');

router.get('/getKajian', kajianController.getKajianFront);
router.get('/', auth, authorizeRole(['admin', 'ustadz']), kajianController.getAll);
router.get('/:id', auth, authorizeRole(['admin', 'ustadz']), kajianController.getOne);
router.post('/', auth, authorizeRole(['admin', 'ustadz']), uploadKajian.single('banner'), kajianController.create);
router.put('/:id', auth, authorizeRole(['admin', 'ustadz']), authorizeKajianOwner, uploadKajian.single('banner'), kajianController.update);
router.delete('/:id', auth, authorizeRole(['admin', 'ustadz']), authorizeKajianOwner, kajianController.remove);

module.exports = router;
