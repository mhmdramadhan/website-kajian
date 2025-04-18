const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const ustadzRoutes = require('./routes/ustadz');
const kajianRoutes = require('./routes/kajian');
const blogRoutes = require('./routes/blog');
const dashboardRoutes = require('./routes/dashboard');

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:3001', // ganti dengan domain frontend anda
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// routes placeholder
app.get('/', (req, res) => res.send('API Kajian berjalan 🚀'));
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/api/ustadz', ustadzRoutes);
app.use('/api/kajian', kajianRoutes);
app.use('/api/blog', blogRoutes);



// sync db untuk developmetn
// sequelize.sync({ alter: true }).then(() => {
sequelize.sync().then(() => {
    console.log('Database synced ✅');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
