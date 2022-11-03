const express = require('express');
const router = express.Router();

router.get('/:query', async (req, res) => {
	try {
		const tweetsData = await twitterClient.tweets.tweetsRecentSearch({
			'query': req.params.query,
			'max_results': req.query.max_results ?? 10,
			'tweet.fields': 'created_at',
			'expansions': 'author_id,geo.place_id',
			'user.fields': 'profile_image_url',
			'place.fields': 'geo'
		});
		let users = new Map();
		tweetsData.includes.users.forEach((user) => {
			users.set(user.id, {'name': user.name, 'username': user.username, 'profile_image_url': user.profile_image_url});
		});
		let places = new Map();
		if (tweetsData.includes.places) {
			tweetsData.includes.places.forEach((place) => {
				places.set(place.id, {'full_name': place.full_name, 'geo': place.geo});
			});
		}
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
			if (tweet.geo) {
				tweets[tweets.length - 1]['place'] = {
					'id': tweet.geo.place_id,
					...places.get(tweet.geo.place_id)
				};
			}
		});
		res.status(200).send(tweets);
	} catch (err) {
		res.status(400).send(err.error);
	}
});

module.exports = router;
