const express = require("express");
const router = express.Router();

router.get('/:query', async (req, res) => {
	const tweet = await twitterClient.tweets.tweetsRecentSearch({'query': req.params.query});
	res.status(200).send(tweet);
});

module.exports = router;
