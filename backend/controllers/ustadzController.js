const { Ustadz } = require('../models');

exports.getAll = async (req, res) => {
    try {
        const data = await Ustadz.findAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Gagal mengambil data ustadz', error: err.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const ustadz = await Ustadz.findByPk(req.params.id);
        if (!ustadz) return res.status(404).json({ message: 'Ustadz tidak ditemukan' });
        res.json(ustadz);
    } catch (err) {
        res.status(500).json({ message: 'Gagal mengambil data ustadz', error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { nama, bio, kontak } = req.body;
        const fotoPath = req.file ? req.file.path : null;
        const ustadz = await Ustadz.create({ nama, foto: fotoPath, bio, kontak });
        res.status(201).json(ustadz);
    } catch (err) {
        res.status(500).json({ message: 'Gagal membuat ustadz', error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const ustadz = await Ustadz.findByPk(id);
        if (!ustadz) return res.status(404).json({ message: 'Ustadz tidak ditemukan' });

        const { nama, bio, kontak } = req.body;
        if (req.file) {
            ustadz.foto = req.file.path;
        }
        await ustadz.update({ nama, bio, kontak, foto: ustadz.foto });

        res.json(ustadz);
    } catch (err) {
        res.status(500).json({ message: 'Gagal memperbarui ustadz', error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const ustadz = await Ustadz.findByPk(req.params.id);
        if (!ustadz) return res.status(404).json({ message: 'Ustadz tidak ditemukan' });

        await ustadz.destroy();
        res.json({ message: 'Ustadz berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ message: 'Gagal menghapus ustadz', error: err.message });
    }
};
