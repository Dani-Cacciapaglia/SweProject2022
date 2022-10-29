import React from 'react';

import * as style from './TweetCard.module.css';

import Logo from '../../assets/twitter-logo.jpg';

const fakeData = {
  id: '2464325',
  text: 'Il testo del tweet',
  author: {
    id: '2445651',
    name: 'Dan Caccia',
    username: '@dancaccia',
  },
};

const TweetCard = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.profileWrapper}>
        <img
          className={style.profilePicture}
          src={Logo}
          alt="immagine profilo"
        />
        <p className={style.profileText}>
          <span className={style.profileName}>{fakeData.author.name}</span>
          {` `}
          {fakeData.author.username}
        </p>
      </div>
      <div className={style.contentWrapper}>{fakeData.text}</div>
    </div>
  );
};

export default TweetCard;
