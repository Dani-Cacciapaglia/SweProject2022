import React, { useState } from 'react';
import axios from 'axios';

import TweetCard from './TweetCard';

export const FantacitorioTeams = () => {
  const [teams, setTeams] = useState([]);
  const searchTeams = async () => {
    const res = await axios.get(
      `${window.$apiUrl}/search/${encodeURIComponent(
        '#fantacitorio has:media'
      )}`
    );
    setTeams(res.data);
    console.log(teams);
  };
  return (
    <>
      <section className="flex flex-col max-w-prose gap-4 mx-auto">
        {teams.map(
          (item, index) =>
            item.media &&
            item.media[0].width === 1024 &&
            item.media[0].height === 512 && (
              <TweetCard key={index} tweetData={item} />
            )
        )}
      </section>
      <button
        onClick={(e) => {
          searchTeams();
        }}
      >
        Carica squadre
      </button>
    </>
  );
};
