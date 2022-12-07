const { Client } = require('twitter-api-sdk');
global.twitterClient = new Client('AAAAAAAAAAAAAAAAAAAAAMDOiQEAAAAAYYSpLT%2BmQqFbECiNXDV5Mdy8gvM%3DL4g6PDikOXSuo61x7ZmE2xyHZip9sVpqJrXILhdWWcjszSL2My');
const cors = require('cors');
const express = require('express');

const port = 8000;
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('build'));
app.use('/api/fantacitorio', require('./api/routes/fantacitorio.js'));
app.use('/api/search', require('./api/routes/search.js'));
app.use('/api/user', require('./api/routes/user.js'));
app.use('/api/chess', require('./api/routes/chess.js'));

/* istanbul ignore next */
if (global.__coverage__) {
  require('@cypress/code-coverage/middleware/express')(app)
}

app.listen(port, () => {
	console.log(`http://localhost:${port}/`);
});
