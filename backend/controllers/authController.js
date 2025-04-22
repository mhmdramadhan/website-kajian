const { User } = require('../models');
const { Ustadz } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log(email, password);
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ message: 'Email tidak ditemukan' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: 'Password salah' });

        const token = jwt.sign({
            id: user.id,
            role: user.role,
            ustadzId: user.ustadzId
        }, JWT_SECRET, { expiresIn: '2h' });

        // Set token ke cookie
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production', // Hanya kirim cookie di HTTPS
        //     maxAge: 2 * 24 * 60 * 60 * 1000 // 2 hari
        // });

        // Kirim token dan user ke client
        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                ustadzId: user.ustadzId
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: err.message });
    }
};

exports.register = async (req, res) => {
    const { email, password, role, ustadzId } = req.body;

    try {
        if (!email || !password || !role) {
            return res.status(400).json({ message: 'Email, password, dan role wajib diisi' });
        }

        if (!['admin', 'ustadz'].includes(role)) {
            return res.status(400).json({ message: 'Role tidak valid' });
        }

        const existing = await User.findOne({ where: { email } });
        if (existing) return res.status(400).json({ message: 'Email sudah digunakan' });

        if (role === 'ustadz' && !ustadzId) {
            return res.status(400).json({ message: 'UstadzId harus diisi untuk role ustadz' });
        }

        if (role === 'ustadz') {
            const ustadz = await Ustadz.findByPk(ustadzId);
            if (!ustadz) {
                return res.status(404).json({ message: 'Ustadz tidak ditemukan' });
            }
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashed,
            role,
            ustadzId: role === 'ustadz' ? ustadzId : null
        });

        res.status(201).json({
            message: 'User berhasil dibuat',
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                ustadzId: user.ustadzId
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: err.message });
    }
};

exports.me = async (req, res) => {
    try {
        const user = req.user; // dari token yang didecode di middleware
        res.json({
            id: user.id,
            email: user.email,
            role: user.role,
            ustadzId: user.ustadzId,
        });
    } catch (err) {
        res.status(500).json({ message: "Gagal ambil user login", error: err.message });
    }
};
