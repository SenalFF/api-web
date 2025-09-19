const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

function mLog(...args) { console.log('@mr senal', ...args); }

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

morgan.token('mrs', () => '@mr senal');
app.use(morgan(':mrs :method :url :status :res[content-length] - :response-time ms'));

app.use(express.static(path.join(__dirname, 'public')));

// Mount existing API files
app.use('/api/berita', require('./api/berita'));
app.use('/api/downloader', require('./api/downloader'));
app.use('/api/search', require('./api/search'));
app.use('/api/stalking', require('./api/stalking'));
app.use('/api/tools', require('./api/tools'));

app.get('/health', (req, res) => {
  mLog('Health check ok');
  res.json({ status: 'ok', developer: 'Mr Senal' });
});

app.listen(PORT, () => {
  mLog(`Server running at http://localhost:${PORT}`);
});
