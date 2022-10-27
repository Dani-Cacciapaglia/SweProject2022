const express = require("express");
const router = express.Router();

router.get('/:query', async (req, res) => {
	try {
		const tweetsData = await twitterClient.tweets.tweetsRecentSearch({'query': req.params.query, 'expansions': 'author_id'});
		let users = new Map();
		tweetsData.includes.users.forEach((user) => {
			users.set(user.id, {'name': user.name, 'username': user.username});
		});
		let tweets = [];
		tweetsData.data.forEach((tweet) => {
			tweets.push({
				'id': tweet.id,
				'text': tweet.text,
				'author': {
					'id': tweet.author_id,
					...users.get(tweet.author_id)
				}
			});
		});
		res.status(200).send(tweets);
	} catch (err) {
		res.status(400).send(err.error);
	}
});

module.exports = router;
