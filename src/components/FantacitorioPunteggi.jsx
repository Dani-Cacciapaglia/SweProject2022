import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tab } from '@headlessui/react';

import { ArrowLeft, ArrowRight } from 'react-feather';

import './style.css';

const ScoresTable = ({ data }) => {
  const columns = ['Politico', 'Punteggio'];
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

const Settimanale = ({ data }) => {
  const [scores, setScores] = useState([]);
  const [index, setIndex] = useState(0);
  const [endOfRecord, setEndOfRecord] = useState(false);

  useEffect(() => {
    if (data && data.length > 0) {
      setEndOfRecord(index >= data.length - 1);

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
      <ScoresTable data={scores} />
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

const Globale = ({ data }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const totalScores = {};

      data.forEach((week) => {
        for (let [key, value] of Object.entries(week)) {
          if (totalScores[key]) {
            totalScores[key] += value;
          } else {
            totalScores[key] = value;
          }
        }
      });

      const keys = Object.keys(totalScores);
      const globalRanking = [];

      keys.forEach((key) => {
        globalRanking.push({
          name: key,
          score: totalScores[key],
        });
      });

      setScores(globalRanking); 
    }
  }, [data]);

  return (
    <div className="scoreBoard">
      <ScoresTable data={scores} />
    </div>
  );
};

const Statistiche=({data})=>{
 
  useEffect(() => {
    if (data && data.length > 0) {
      const concorrenti=[]
      const formattedData = data.map((week)=>{
        const keys = Object.keys(week);
        concorrenti.push(...keys)
        const formattedWeek=[]
        keys.forEach((key) => {
          formattedWeek.push({
            name: key,
            score: week[key],
          });
        });
        return formattedWeek
      })
      const deltas=[]
      concorrenti.forEach((concorrente)=>{
        let maxDelta
        data.reduce((acc,week,index)=>{
          if(index===0)acc=week[concorrente]||0
          else {
            acc=week[concorrente]-acc
            if(acc>maxDelta) maxDelta=acc;
          }
        })
        deltas.push({name:concorrente,delta:maxDelta
        })
      })
      console.log(deltas)
    }
  }, [data]);

return <div>kijwbefhvleijkrufbgloqwiu</div>
}

export const TabPunteggi = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get(`${window.$apiUrl}/fantacitorio/scores`);
      setData(res.data.reverse());
    };
    loadData();
  }, []);

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
        <Tab
          className={({ selected }) =>
            (selected ? 'font-bold border-b-4 border-sky-300 ' : '') +
            'border-b-2 disabled:text-neutral-700 enabled:hover:font-bold'
          }
        >
          Statistiche 
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <Settimanale data={data} />
        </Tab.Panel>
        <Tab.Panel>
          <Globale data={data} />
        </Tab.Panel>
        <Tab.Panel>
          <Statistiche data={data}/>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
