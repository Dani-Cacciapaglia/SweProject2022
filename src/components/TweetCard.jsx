import React from 'react';

const TweetCard = ({ tweetData }) => {
  const rawDate = new Date(tweetData.created_at);
  const date = Intl.DateTimeFormat('it-IT', {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    weekday: 'short',
  }).format(rawDate);

  return (
    <div className="flex flex-col gap-2 border rounded-xl p-4 shadow">
      <div className="flex flex-row gap-2 items-center">
        <img
          className="h-12 rounded-full aspect-square"
          src={tweetData.author.profile_image_url}
          alt="immagine profilo"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{tweetData.author.name}</span>
          <span className="text-neutral-700">@{tweetData.author.username}</span>
        </div>
      </div>
      <div className="px-2">{tweetData.text}</div>
      <div className="px-2 text-sm text-neutral-700">
        {date}
        {tweetData.place ? ' - ' + tweetData.place.full_name : ''}
      </div>
    </div>
  );
};

export default TweetCard;
