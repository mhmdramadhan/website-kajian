const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { auth, authorizeRole, authorizeBlogOwner } = require('../middlewares/authMiddleware');
const { uploadBlog } = require('../middlewares/uploadMiddleware');

router.get('/', auth, authorizeRole(['admin', 'ustadz']), blogController.getAll);
router.get('/:id', auth, authorizeRole(['admin', 'ustadz']), blogController.getOne);
router.post('/', auth, authorizeRole(['admin', 'ustadz']), uploadBlog.single('banner'), blogController.create);
router.put('/:id', auth, authorizeRole(['admin', 'ustadz']), authorizeBlogOwner, uploadBlog.single('banner'), blogController.update);
router.delete('/:id', auth, authorizeRole(['admin', 'ustadz']), authorizeBlogOwner, blogController.remove);

module.exports = router;
