const { Blog, Ustadz } = require('../models');

exports.getAll = async (req, res) => {
    try {
        const blogs = await Blog.findAll({ include: ['ustadz', 'creator'] });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: 'Gagal mengambil blog', error: err.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id, { include: ['ustadz', 'creator'] });
        if (!blog) return res.status(404).json({ message: 'Blog tidak ditemukan' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Gagal mengambil blog', error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { judul, isi, ustadzId } = req.body;
        const bannerPath = req.file ? req.file.path : null;

        // Validasi ustadzId
        if (ustadzId) {
            const ustadz = await Ustadz.findByPk(ustadzId);
            if (!ustadz) return res.status(404).json({ message: 'Ustadz tidak ditemukan' });
        }

        const blog = await Blog.create({
            judul,
            isi,
            banner: bannerPath,
            ustadzId,
            createdBy: req.user.id
        });

        res.status(201).json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Gagal membuat blog', error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog tidak ditemukan' });

        const { judul, isi, ustadzId } = req.body;

        if (req.file) blog.banner = req.file.path;

        await blog.update({ judul, isi, ustadzId, banner: blog.banner });

        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Gagal update blog', error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog tidak ditemukan' });

        await blog.destroy(); // soft delete
        res.json({ message: 'Blog berhasil dihapus (soft delete)' });
    } catch (err) {
        res.status(500).json({ message: 'Gagal hapus blog', error: err.message });
    }
};
