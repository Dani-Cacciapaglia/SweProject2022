const { Client } = require('twitter-api-sdk');
global.twitterClient = new Client('AAAAAAAAAAAAAAAAAAAAAMDOiQEAAAAAYYSpLT%2BmQqFbECiNXDV5Mdy8gvM%3DL4g6PDikOXSuo61x7ZmE2xyHZip9sVpqJrXILhdWWcjszSL2My');
const cors = require('cors');
const express = require('express');

const port = 8000;
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/search', require('./api/routes/search.js'));

app.listen(port, () => {
	console.log(`http://localhost:${port}/`);
});
