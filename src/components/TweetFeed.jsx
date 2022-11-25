import React, { useContext } from 'react';
import { Tab } from '@headlessui/react';
import { Timeline } from './Timeline';
import { Map } from './Map';
import { WordCloud } from './WordCloud';

import { SearchContext } from '../hooks/SearchContext';

const TweetFeed = ({ loadMore }) => {
  const { result } = useContext(SearchContext);

  return (
    <>
      {result && result.length > 0 && (
        <Tab.Group>
          <Tab.List className="flex flex-row justify-around w-full max-w-prose">
            <Tab className="border-b-2 hover:font-bold ui-selected:font-bold ui-selected:border-b-4 ui-selected:border-sky-300">
              Timeline
            </Tab>
            <Tab
              className="border-b-2 disabled:text-neutral-700 enabled:hover:font-bold ui-selected:font-bold ui-selected:border-b-4 ui-selected:border-sky-300"
              disabled={
                result.filter((item) => {
                  return item.place;
                }).length === 0
              }
            >
              Mappa
            </Tab>
            <Tab className="border-b-2 hover:font-bold ui-selected:font-bold ui-selected:border-b-4 ui-selected:border-sky-300">
              WordCloud
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className="flex flex-col items-center">
              <Timeline loadMore={loadMore} />
            </Tab.Panel>
            <Tab.Panel>
              <Map />
            </Tab.Panel>
            <Tab.Panel>
              <WordCloud />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      )}
    </>
  );
};

export default TweetFeed;
