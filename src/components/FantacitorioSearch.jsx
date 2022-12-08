import { useState } from 'react';
import axios from 'axios';

import TweetCard from './TweetCard';

export const FantacitorioSearch = () => {
  const placeholderText = "Search for a user's team";
  const submitText = 'Search';
  const [userTeams, setUserTeams] = useState([]);

  async function searchHandler(e) {
    e.preventDefault();

    let res;
    try {
      res = await axios.get(
        `${window.$apiUrl}/user/${encodeURIComponent(e.target[0].value)}`,
        { params: { max_results: 100 } }
      );

      let t = [];
      for (let i = 0; i < res.data.length; i++) {
        if (
          res.data[i].media &&
          res.data[i].media[0].width === 1024 &&
          res.data[i].media[0].height === 512
        ) {
          t.push(res.data[i]);
        }
      }
      setUserTeams(t);
    } catch (err) {}
  }

  return (
    <div className="mt-3">
      <form
        className="flex flex-row"
        onSubmit={(e) => {
          searchHandler(e);
        }}
      >
        <input
          className="text-lg grow border border-r-0 rounded-l-full pl-4 py-2"
          placeholder={placeholderText}
          type="search"
          required
        />
        <input
          type="submit"
          className="rounded-r-full px-4 bg-sky-300 hover:bg-sky-400"
          value={submitText}
        />
      </form>
      <section className="flex flex-col max-w-prose gap-4 my-3 mx-auto">
        {userTeams.map((item, index) => (
          <TweetCard key={index} tweetData={item} />
        ))}
      </section>
    </div>
  );
};
