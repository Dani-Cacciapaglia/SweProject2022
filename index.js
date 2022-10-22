const { Client } = require('twitter-api-sdk');
const client = new Client('AAAAAAAAAAAAAAAAAAAAAMDOiQEAAAAAYYSpLT%2BmQqFbECiNXDV5Mdy8gvM%3DL4g6PDikOXSuo61x7ZmE2xyHZip9sVpqJrXILhdWWcjszSL2My');
const cors = require('cors');
const express = require('express');

const port = 8000;
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
	const tweet = await client.tweets.findTweetById("20");
	res.send(tweet);
});
app.listen(port, () => {
	console.log(`http://localhost:${port}/`);
});
