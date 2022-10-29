import React from 'react';

import * as style from './TweetCard.module.css';

import Logo from '../../assets/twitter-logo.jpg';

const TweetCard = ({ tweetData }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.profileWrapper}>
        <img
          className={style.profilePicture}
          src={Logo}
          alt="immagine profilo"
        />
        <p className={style.profileText}>
          <span className={style.profileName}>{tweetData.author.name}</span>
          {` `}
          {tweetData.author.username}
        </p>
      </div>
      <div className={style.contentWrapper}>{tweetData.text}</div>
    </div>
  );
};

export default TweetCard;
