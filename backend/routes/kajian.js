const express = require('express');
const router = express.Router();
const kajianController = require('../controllers/kajianController');
const { auth } = require('../middlewares/authMiddleware');
const { uploadKajian } = require('../middlewares/uploadMiddleware');

router.get('/', auth, kajianController.getAll);
router.get('/:id', auth, kajianController.getOne);
router.post('/', auth, uploadKajian.single('banner'), kajianController.create);
router.put('/:id', auth, uploadKajian.single('banner'), kajianController.update);
router.delete('/:id', auth, kajianController.remove);

module.exports = router;
