const express = require('express');
const router = express.Router();
const ustadzController = require('../controllers/ustadzController');
const { auth, isAdmin } = require('../middlewares/authMiddleware');
const { uploadUstadz } = require('../middlewares/uploadMiddleware');

// Hanya admin utama yang boleh buat/update/delete ustadz
router.get('/', auth, ustadzController.getAll);
router.get('/:id', auth, ustadzController.getOne);
router.post(
  '/',
  auth,
  isAdmin,
  uploadUstadz.single('foto'),
  ustadzController.create
);
router.put(
  '/:id',
  auth,
  isAdmin,
  uploadUstadz.single('foto'),
  ustadzController.update
);
router.delete('/:id', auth, isAdmin, ustadzController.remove);

module.exports = router;
