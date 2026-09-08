require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const DrawResult = require('./models/DrawResult');
const syncMagnumResults = require('./services/scraper'); 

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

// 🔌 ONLINE MONGODB ATLAS CONNECTION STRING
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to Cloud MongoDB Atlas!'))
  .catch(err => console.error('❌ Cloud DB Error:', err));

// Routes remain identical!
app.get('/', async (req, res) => {
  try {
    const result = await DrawResult.findOne({ singletonKey: 'LATEST_MAGNUM' });
    res.render('index', { result });
  } catch (err) {
    res.status(500).send('Database Error');
  }
});

app.post('/api/sync-draw', async (req, res) => {
  try {
    await syncMagnumResults();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Server live on http://localhost:3000'));