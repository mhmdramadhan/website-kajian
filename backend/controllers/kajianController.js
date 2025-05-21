const { Kajian, Ustadz, User } = require('../models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

exports.getAll = async (req, res) => {
    const { ustadzId, tanggal, search, page = 1, limit = 10, sortBy = 'tanggal_waktu', sortOrder = 'asc' } = req.query;

    const where = {
        deletedAt: null // soft delete support
    };

    if (ustadzId) {
        where.ustadzId = ustadzId;
    }

    if (tanggal) {
        const dateStart = new Date(tanggal);
        const dateEnd = new Date(tanggal);
        dateEnd.setDate(dateEnd.getDate() + 1);
        where.tanggal_waktu = {
            [Op.gte]: dateStart,
            [Op.lt]: dateEnd
        };
    }

    if (search) {
        where.judul = {
            [Op.like]: `%${search}%`
        };
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    try {
        const { count, rows } = await Kajian.findAndCountAll({
            where,
            include: [
                { model: Ustadz, as: 'ustadz' },
                { model: User, as: 'creator' }
            ],
            order: [[sortBy, sortOrder]],
            limit: parseInt(limit),
            offset
        });

        res.json({
            data: rows,
            total: count,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

exports.getKajianFront = async (req, res) => {
    const { ustadzId, tanggal, search, page = 1, limit = 10, sortBy = 'tanggal_waktu', sortOrder = 'asc' } = req.query;

    const where = {
        deletedAt: null // soft delete support
    };

    if (ustadzId) {
        where.ustadzId = ustadzId;
    }

    if (tanggal) {
        const dateStart = new Date(tanggal);
        const dateEnd = new Date(tanggal);
        dateEnd.setDate(dateEnd.getDate() + 1);
        where.tanggal_waktu = {
            [Op.gte]: dateStart,
            [Op.lt]: dateEnd
        };
    }

    if (search) {
        where.judul = {
            [Op.like]: `%${search}%`
        };
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    try {
        const { count, rows } = await Kajian.findAndCountAll({
            where,
            attributes: ['id', 'judul', 'banner', 'tanggal_waktu', 'lokasi', 'link_lokasi'],
            include: [
                { model: Ustadz, as: 'ustadz' },
                { model: User, as: 'creator' }
            ],
            order: [[sortBy, sortOrder]],
            limit: parseInt(limit),
            offset
        });

        res.json({
            data: rows,
            total: count,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

exports.getOne = async (req, res) => {
    try {
        const kajian = await Kajian.findByPk(req.params.id, { include: ['ustadz', 'creator'] });
        if (!kajian) return res.status(404).json({ message: 'Kajian tidak ditemukan' });
        res.json(kajian);
    } catch (err) {
        res.status(500).json({ message: 'Gagal mengambil data kajian', error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { judul, tanggal_waktu, lokasi, link_lokasi, materi, sumber, ustadzId } = req.body;
        const bannerPath = req.file ? req.file.path : null;

        // Validasi ustadzId
        if (ustadzId) {
            const ustadz = await Ustadz.findByPk(ustadzId);
            if (!ustadz) return res.status(404).json({ message: 'Ustadz tidak ditemukan' });
        }

        // Validasi tanggal_waktu
        if (!tanggal_waktu) return res.status(400).json({ message: 'Tanggal dan waktu tidak boleh kosong' });

        const kajian = await Kajian.create({
            judul,
            banner: bannerPath,
            tanggal_waktu,
            lokasi,
            link_lokasi,
            materi,
            sumber,
            ustadzId,
            createdBy: req.user.id
        });

        res.status(201).json(kajian);
    } catch (err) {
        res.status(500).json({ message: 'Gagal membuat kajian', error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const kajian = await Kajian.findByPk(id);
        if (!kajian) return res.status(404).json({ message: 'Kajian tidak ditemukan' });

        const { judul, tanggal_waktu, lokasi, link_lokasi, materi, sumber, ustadzId } = req.body;

        if (req.file) {
            kajian.banner = req.file.path;
        }

        await kajian.update({
            judul,
            tanggal_waktu,
            lokasi,
            link_lokasi,
            materi,
            sumber,
            ustadzId,
            banner: kajian.banner
        });

        res.json(kajian);
    } catch (err) {
        res.status(500).json({ message: 'Gagal memperbarui kajian', error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const kajian = await Kajian.findByPk(req.params.id);
        if (!kajian) return res.status(404).json({ message: 'Kajian tidak ditemukan' });

        // Hapus file banner jika ada
        if (kajian.banner) {
            const bannerPath = path.resolve(kajian.banner);
            fs.unlink(bannerPath, (err) => {
                if (err) {
                    console.error(`Gagal menghapus file: ${bannerPath}`, err);
                }
            });
        }

        await kajian.destroy();
        res.json({ message: 'Kajian berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ message: 'Gagal menghapus kajian', error: err.message });
    }
};
