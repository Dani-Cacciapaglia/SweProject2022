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

const Statistiche = ({ data }) => {
  const [deltas, setDeltas] = useState([]);
  const [attendancesStats, setAttendancesStats] = useState([]);
  const [averageStats, setAverageStats] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      let deltas = [];
      let attendancesStats = {};
      let politicianScores = {};
      let averageStats = {};
      let lastScore = {};
      let chronologicalData = data;
      chronologicalData.reverse();
      chronologicalData.forEach((week, weekNumber) => {
        deltas[weekNumber] = {};
        Object.keys(week).forEach((politician) => {
          const delta = week[politician] - (lastScore[politician] || 0);
          if (delta > (deltas[weekNumber].delta || 0)) {
            deltas[weekNumber].politician = politician;
            deltas[weekNumber].delta = delta;
          }
          lastScore[politician] = week[politician];
          attendancesStats[politician] =
            (attendancesStats[politician] || 0) + 1;
          politicianScores[politician] =
            (politicianScores[politician] || 0) + week[politician];
        });
      });
      Object.keys(politicianScores).forEach((politician) => {
        averageStats[politician] =
          politicianScores[politician] / attendancesStats[politician];
      });
      setDeltas(deltas);
      let attendancesStatsArray = [];
      Object.keys(attendancesStats).forEach((politician) => {
        attendancesStatsArray.push({
          politician: politician,
          attendances: attendancesStats[politician],
        });
      });
      let averageStatsArray = [];
      Object.keys(averageStats).forEach((politician) => {
        averageStatsArray.push({
          politician: politician,
          average: averageStats[politician],
        });
      });
      setAttendancesStats(attendancesStatsArray);
      setAverageStats(averageStatsArray);
    }
  }, [data]);

  return (
    <>
      <div className="scoreBoard">
        <table className="tableStyle">
          <thead>
            <tr>
              <th>Settimana</th>
              <th>Politico</th>
              <th>Delta</th>
            </tr>
          </thead>
          <tbody>
            {deltas.map((delta, index) => {
              return (
                <tr key={index}>
                  <td className="numberRow">{index + 1}</td>
                  <td>{delta.politician}</td>
                  <td>{delta.delta}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="scoreBoard">
        <table className="tableStyle">
          <thead>
            <tr>
              <th>Posizione</th>
              <th>Politico</th>
              <th>Presenze</th>
            </tr>
          </thead>
          <tbody>
            {attendancesStats
              .sort((a, b) => a.attendances < b.attendances)
              .map((attendancesStat, index) => {
                return (
                  index < 10 && (
                    <tr key={index}>
                      <td className="numberRow">{index + 1}</td>
                      <td>{attendancesStat.politician}</td>
                      <td>{attendancesStat.attendances}</td>
                    </tr>
                  )
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="scoreBoard">
        <table className="tableStyle">
          <thead>
            <tr>
              <th>Posizione</th>
              <th>Politico</th>
              <th>Media</th>
            </tr>
          </thead>
          <tbody>
            {averageStats
              .sort((a, b) => a.average < b.average)
              .map((averageStat, index) => {
                return (
                  index < 10 && (
                    <tr key={index}>
                      <td className="numberRow">{index + 1}</td>
                      <td>{averageStat.politician}</td>
                      <td>{averageStat.average}</td>
                    </tr>
                  )
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

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
          <Statistiche data={data} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
