const express = require('express');
const utils = require('../utils.js');
const router = express.Router();

router.get('/:query', async (req, res) => {
	try {
		const tweetsData = await twitterClient.tweets.tweetsRecentSearch({
			'query': req.params.query,
			'max_results': req.query.max_results ?? 10,
			'start_time': req.query.start_time,
			'end_time': req.query.end_time,
			'next_token': req.query.next_token,
			'tweet.fields': 'created_at',
			'expansions': 'author_id,geo.place_id,attachments.media_keys',
			'user.fields': 'profile_image_url',
			'place.fields': 'geo',
			'media.fields': 'media_key,type,width,height,url,alt_text'
		});
		res.status(200).send(utils.formatTweets(tweetsData));
	} catch (err) {
		res.status(400).send(err.error);
	}
});

module.exports = router;
