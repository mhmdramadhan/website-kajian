const { Blog, Ustadz, User } = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
    const { ustadzId, search, page = 1, limit = 10, sortBy = 'createdAt', order = 'asc' } = req.query;

    const where = {};

    if (ustadzId) {
        where.ustadzId = ustadzId;
    }

    if (search) {
        where.judul = {
            [Op.like]: `%${search}%`
        };
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    try {
        const blogs = await Blog.findAll({
            where,
            include: [
                { model: Ustadz, as: 'ustadz' },
                { model: User, as: 'creator' }
            ],
            order: [[sortBy, order]],
            limit: parseInt(limit),
            offset
        });

        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
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
