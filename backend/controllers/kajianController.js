const { Kajian, Ustadz } = require('../models');

exports.getAll = async (req, res) => {
    try {
        const kajian = await Kajian.findAll({ include: ['ustadz', 'creator'] });
        res.json(kajian);
    } catch (err) {
        res.status(500).json({ message: 'Gagal mengambil data kajian', error: err.message });
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

        await kajian.destroy();
        res.json({ message: 'Kajian berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ message: 'Gagal menghapus kajian', error: err.message });
    }
};
