import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TweetCard from './TweetCard';

export const FantacitorioTeams = () => {
  const [teams, setTeams] = useState([]);
  const [next_token, setNextToken] = useState('');

  useEffect(() => {
    async function loadTeams() {
      const res = await axios.get(
        `${window.$apiUrl}/search/${encodeURIComponent(
          '#fantacitorio has:media'
        )}`,
        { params: { next_token: next_token } }
      );
      setTeams((t) => t.concat(res.data));
    }
    loadTeams();
  }, [next_token]);

  return (
    <div className="flex flex-col gap-2 mt-2">
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
      {teams.length > 0 && teams[teams.length - 1].next_token && (
        <button
          className="bg-sky-300 hover:bg-sky-400 rounded p-2 mx-auto"
          onClick={(e) => {
            setNextToken(teams[teams.length - 1].next_token);
          }}
        >
          Carica squadre
        </button>
      )}
    </div>
  );
};
