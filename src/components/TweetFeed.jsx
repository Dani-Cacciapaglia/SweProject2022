import React, { useContext } from 'react';
import { Tab } from '@headlessui/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import TweetCard from './TweetCard';
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
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className="flex flex-col items-center">
              <section className="flex flex-col max-w-prose gap-4 p-4 mx-auto">
                {result.map((item, index) => (
                  <TweetCard key={index} tweetData={item} />
                ))}
              </section>
              {result[result.length - 1].next_token && (
                <button
                  className="bg-sky-300 hover:bg-sky-400 rounded p-2"
                  onClick={(e) => {
                    loadMore(e, result[result.length - 1].next_token);
                  }}
                >
                  Carica altro
                </button>
              )}
            </Tab.Panel>
            <Tab.Panel>
              <MapContainer
                className="w-screen h-[80vh] max-w-screen-lg"
                center={[20, 0]}
                zoom={2}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {result.map(
                  (item, index) =>
                    item.place &&
                    item.place.geo &&
                    item.place.geo.bbox && (
                      <Marker
                        key={index}
                        position={[
                          (item.place.geo.bbox[1] + item.place.geo.bbox[3]) / 2,
                          (item.place.geo.bbox[0] + item.place.geo.bbox[2]) / 2,
                        ]}
                      >
                        <Popup>
                          <b>{item.author.name}</b>: {item.text}
                        </Popup>
                      </Marker>
                    )
                )}
              </MapContainer>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      )}
    </>
  );
};

export default TweetFeed;
