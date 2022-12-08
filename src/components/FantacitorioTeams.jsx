import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TweetCard from './TweetCard';

import './style.css';

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
    <div className="fantacitorio-teams-div">
      <section className="flex flex-col max-w-prose gap-4 mx-auto fantacitorio-teams-section">
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
          className="btn"
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
