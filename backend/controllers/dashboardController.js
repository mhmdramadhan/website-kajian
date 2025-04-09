const { Kajian, Blog, Ustadz, sequelize } = require('../models');
const { Op } = require('sequelize');

exports.adminOverview = async (req, res) => {
    try {
        const totalKajian = await Kajian.count();
        const totalBlog = await Blog.count();
        const totalUstadz = await Ustadz.count();

        const chartKajianPerUstadz = await Kajian.findAll({
            attributes: [
                'ustadzId',
                [sequelize.fn('COUNT', sequelize.col('Kajian.id')), 'jumlahKajian']
            ],
            include: { model: Ustadz, as: 'ustadz', attributes: ['nama'] },
            group: ['ustadzId']
        });

        const chartBlogPerUstadz = await Blog.findAll({
            attributes: [
                'ustadzId',
                [sequelize.fn('COUNT', sequelize.col('Blog.id')), 'jumlahBlog']
            ],
            include: { model: Ustadz, as: 'ustadz', attributes: ['nama'] },
            group: ['ustadzId']
        });

        res.json({
            totalKajian,
            totalBlog,
            totalUstadz,
            chartKajianPerUstadz: chartKajianPerUstadz.map(item => ({
                nama: item.ustadz?.nama || 'Tidak diketahui',
                jumlahKajian: item.dataValues.jumlahKajian
            })),
            chartBlogPerUstadz: chartBlogPerUstadz.map(item => ({
                nama: item.ustadz?.nama || 'Tidak diketahui',
                jumlahBlog: item.dataValues.jumlahBlog
            }))
        });
    } catch (err) {
        res.status(500).json({ message: 'Gagal mengambil data dashboard', error: err.message });
    }
};

exports.ustadzOverview = async (req, res) => {
    try {
        const ustadzId = req.query.ustadzId;
        const ustadz = await Ustadz.findByPk(ustadzId);

        if (!ustadz) {
            return res.status(404).json({ message: 'Ustadz tidak ditemukan' });
        }

        const jumlahKajian = await Kajian.count({ where: { ustadzId } });
        const jumlahBlog = await Blog.count({ where: { ustadzId } });

        const kajianTerdekat = await Kajian.findOne({
            where: {
                ustadzId,
                tanggal_waktu: { [Op.gte]: new Date() }
            },
            order: [['tanggal_waktu', 'ASC']]
        });

        const blogTerbaru = await Blog.findOne({
            where: { ustadzId },
            order: [['createdAt', 'DESC']]
        });

        res.json({
            nama: ustadz.nama,
            jumlahKajian,
            jumlahBlog,
            kajianTerdekat,
            blogTerbaru
        });
    } catch (err) {
        res.status(500).json({ message: 'Gagal mengambil data ustadz', error: err.message });
    }
};
