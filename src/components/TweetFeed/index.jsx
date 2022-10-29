import React from 'react';

import * as style from './TweetFeed.module.css';

import TweetCard from '../TweetCard';

const fakeDataArray = [
  {
    id: '2464325',
    text: 'Il testo del tweet',
    author: {
      id: '2445651',
      name: 'Dan Caccia',
      username: '@dancaccia',
    },
  },
  {
    id: '376572',
    text: 'Il mio secondo tweet',
    author: {
      id: '154446',
      name: 'Elon Musk',
      username: '@elon.musk',
    },
  },
  {
    id: '62546256',
    text: "Non c'è due senza tre",
    author: {
      id: '68762',
      name: 'Giorgia Meloni',
      username: '@IlPresidente',
    },
  },
];

const TweetFeed = () => {
  return (
    <section className={style.feed}>
      {fakeDataArray.map((item) => (
        <TweetCard tweetData={item} />
      ))}
    </section>
  );
};

export default TweetFeed;
