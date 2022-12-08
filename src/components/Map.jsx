import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { SearchContext } from '../hooks/SearchContext';

export const Map = () => {
  const { result } = useContext(SearchContext);

  return (
    <MapContainer
      className="w-screen h-[80vh] max-w-screen-md"
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
  );
};
