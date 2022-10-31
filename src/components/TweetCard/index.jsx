import React from 'react';

import * as style from './TweetCard.module.css';

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
    <div className={style.wrapper}>
      <div className={style.profileWrapper}>
        <img
          className={style.profilePicture}
          src={tweetData.author.profile_image_url}
          alt="immagine profilo"
        />
        <p className={style.profileText}>
          <span className={style.profileName}>{tweetData.author.name}</span>
          {` `}
          {tweetData.author.username}
        </p>
      </div>
      <div className={style.contentWrapper}>{tweetData.text}</div>
      <div className={style.dateWrapper}>{date}</div>
    </div>
  );
};

export default TweetCard;
