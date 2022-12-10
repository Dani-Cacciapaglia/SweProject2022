import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tab } from '@headlessui/react';

import { ArrowLeft, ArrowRight } from 'react-feather';

import './style.css';

const WeeklyTable = ({ data, columns }) => {
  const sorted = data.sort((prev, next) => next.score - prev.score);

  return (
    <table className="tableStyle">
      <thead>
        <tr>
          <th>Posizione</th>
          {columns.map((label, index) => (
            <th key={index}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map((row, index) => {
          return (
            <tr key={index}>
              <td className="numberRow">{index + 1}</td>
              <td>{row.name}</td>
              <td className="numberRow">{row.score}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const Settimanale = () => {
  const [data, setData] = useState(null);
  const [scores, setScores] = useState([]);
  const [index, setIndex] = useState(0);
  const [endOfRecord, setEndOfRecord] = useState(false);

  const columns = ['Politico', 'Punteggio'];

  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get(`${window.$apiUrl}/fantacitorio/scores`);
      setData(res.data);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      if (index >= data.length) {
        setEndOfRecord(true);
      }
      const weekScores = data[index];
      const keys = Object.keys(weekScores);
      const formattedData = [];

      keys.forEach((key) => {
        formattedData.push({
          name: key,
          score: weekScores[key],
        });
      });

      setScores(formattedData);
    }
  }, [index, data]);

  return (
    <div className="scoreBoard">
      <button
        className="btn"
        disabled={endOfRecord}
        onClick={() => setIndex(index + 1)}
      >
        <ArrowLeft />
      </button>
      <WeeklyTable columns={columns} data={scores} />
      <button
        className="btn"
        disabled={index <= 0}
        onClick={() => setIndex(index - 1)}
      >
        <ArrowRight />
      </button>
    </div>
  );
};

const Globale = () => {
  return <div>Globali</div>;
};

export const TabPunteggi = () => {
  return (
    <Tab.Group>
      <Tab.List className="flex flex-row justify-around w-full">
        <Tab
          className={({ selected }) =>
            (selected ? 'font-bold border-b-4 border-sky-300 ' : '') +
            'border-b-2 hover:font-bold'
          }
        >
          Settimanali
        </Tab>
        <Tab
          className={({ selected }) =>
            (selected ? 'font-bold border-b-4 border-sky-300 ' : '') +
            'border-b-2 disabled:text-neutral-700 enabled:hover:font-bold'
          }
        >
          Globali
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <Settimanale />
        </Tab.Panel>
        <Tab.Panel>
          <Globale />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
