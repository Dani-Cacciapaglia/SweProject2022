function formatTweets(tweetsData) {
	let tweets = [];
	if (tweetsData.meta.result_count == 0) {
		return tweets;
	}
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
	let media = new Map();
	if (tweetsData.includes.media) {
		tweetsData.includes.media.forEach((m) => {
			media.set(m.media_key, {'type': m.type, 'width': m.width, 'height': m.height, 'url': m.url, 'alt_text': m.alt_text});
		});
	}
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
		if (tweet.attachments) {
			tweet.attachments.media_keys.forEach((media_key) => {
				if (media.get(media_key).type == 'photo') {
					if (!tweets[tweets.length - 1]['media']) {
						tweets[tweets.length - 1]['media'] = [];
					}
					tweets[tweets.length - 1]['media'].push({
						'media_key': media_key,
						...media.get(media_key)
					});
				}
			});
		}
	});
	if (tweetsData.meta.next_token) {
		tweets[tweets.length - 1]['next_token'] = tweetsData.meta.next_token;
	}
	return tweets;
}

module.exports = {formatTweets};
