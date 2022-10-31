const express = require("express");
const router = express.Router();

router.get('/:query', async (req, res) => {
	try {
		const tweetsData = await twitterClient.tweets.tweetsRecentSearch({'query': req.params.query, 'tweet.fields': 'created_at', 'expansions': 'author_id', 'user.fields': 'profile_image_url'});
		let users = new Map();
		tweetsData.includes.users.forEach((user) => {
			users.set(user.id, {'name': user.name, 'username': user.username, 'profile_image_url': user.profile_image_url});
		});
		let tweets = [];
		tweetsData.data.forEach((tweet) => {
			tweets.push({
				'id': tweet.id,
				'text': tweet.text,
				'created_at': tweet.created_at,
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
