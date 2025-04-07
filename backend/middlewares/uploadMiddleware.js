const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/ustadz');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `ustadz-${unique}${ext}`);
    }
});

// Filter ekstensi
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) cb(null, true);
    else cb(new Error('Hanya file .jpg, .jpeg, .png yang diizinkan'));
};

// Batas ukuran 2MB
const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter
});

// upload kajian
const storageKajian = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/kajian');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `kajian-${unique}${ext}`);
    }
});

const uploadKajian = multer({
    storage: storageKajian,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter
});

// upload blog
const storageBlog = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/blog');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `blog-${unique}${ext}`);
    }
});

const uploadBlog = multer({
    storage: storageBlog,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter
});

module.exports = {
    uploadUstadz: upload, // sebelumnya
    uploadKajian,
    uploadBlog,
};
