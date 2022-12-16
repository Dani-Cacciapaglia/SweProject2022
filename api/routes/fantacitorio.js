const express = require('express');
const router = express.Router();
const numberPattern = /\b\d+\b/g;
const wordsPattern = /\w/g;
const { politicians } = require('../politicians.js');

router.get('/scores', async (req, res) => {
	try {
		const user = await twitterClient.users.findUserByUsername('Fanta_citorio');
		let scores = [];
		const fantacitorioStart = new Date('2022-11-04T12:00:00.000Z');
		const fantacitorioEnd = new Date('2022-11-05T12:00:00.000Z');
		while (fantacitorioEnd < new Date()) {
			scores.push({});
			let tweets = [];
			let next_token;
			do {
				const tweetsData = await twitterClient.tweets.usersIdTweets(user.data.id, {
					'max_results': 100,
					'start_time': fantacitorioStart.toJSON(),
					'end_time': fantacitorioEnd.toJSON(),
					'pagination_token': next_token,
					'tweet.fields': 'created_at',
				});
				next_token = tweetsData.meta.next_token;
				for (const tweet of tweetsData.data) {
					tweets.push({'text': tweet.text, 'created_at': tweet.created_at});
				}
			} while (next_token);
			for (const tweet of tweets) {
				const lines = tweet.text.split('\n');
				for (const line of lines) {
					const score = line.match(numberPattern);
					if (score) {
						line.split(' ').forEach((word) => {
							const politician = politicians.find((politician) => (politician.toLowerCase() == word.toLowerCase()));
							if (politician) {
								scores[scores.length - 1][politician] = (scores[scores.length - 1][politician] ?? 0) + (parseInt(score[score.length - 1]) * (line.match(/malus/gi) ? -1 : 1));
							}
						});
					}
				}
			}
			fantacitorioStart.setDate(fantacitorioStart.getDate() + 7);
			fantacitorioEnd.setDate(fantacitorioEnd.getDate() + 7);
		}
		res.status(200).send(scores);
	} catch (err) {
		res.status(400).send(err.error);
	}
});

module.exports = router;
