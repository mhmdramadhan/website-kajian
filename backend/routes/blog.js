const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { auth } = require('../middlewares/authMiddleware');
const { uploadBlog } = require('../middlewares/uploadMiddleware');

router.get('/', auth, blogController.getAll);
router.get('/:id', auth, blogController.getOne);
router.post('/', auth, uploadBlog.single('banner'), blogController.create);
router.put('/:id', auth, uploadBlog.single('banner'), blogController.update);
router.delete('/:id', auth, blogController.remove);

module.exports = router;
