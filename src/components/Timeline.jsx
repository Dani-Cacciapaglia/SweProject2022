import React, { useState, useContext } from 'react';
import TweetCard from './TweetCard';

import { SearchContext } from '../hooks/SearchContext';

export const Timeline = ({ loadMore }) => {
  const { result } = useContext(SearchContext);
  const [reverseOrder, setReverseOrder] = useState(false);

  return (
    <>
      <button
        className="bg-sky-300 hover:bg-sky-400 rounded p-2 my-2"
        onClick={(e) => {
          setReverseOrder(!reverseOrder);
        }}
      >
        Inverti ordine temporale
      </button>
      <div
        className={
          'flex gap-2 ' + (reverseOrder ? 'flex-col-reverse' : 'flex-col')
        }
      >
        <section className="flex flex-col max-w-prose gap-4 mx-auto">
          {(reverseOrder ? result.slice().reverse() : result).map(
            (item, index) => (
              <TweetCard key={index} tweetData={item} />
            )
          )}
        </section>
        {result[result.length - 1].next_token && (
          <button
            className="bg-sky-300 hover:bg-sky-400 rounded p-2 mx-auto"
            onClick={(e) => {
              loadMore(e, result[result.length - 1].next_token);
            }}
          >
            Carica altro
          </button>
        )}
      </div>
    </>
  );
};
