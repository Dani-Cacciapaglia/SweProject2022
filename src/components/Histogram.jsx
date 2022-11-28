import { useContext } from 'react';
import { Vega } from 'react-vega';

import { SearchContext } from '../hooks/SearchContext';

export const Histogram = () => {
  const { result } = useContext(SearchContext);

  const spec = {
    $schema: 'https://vega.github.io/schema/vega/v5.json',
    width: 600,
    height: 300,
    autosize: { type: 'fit', resize: true, contains: 'padding' },

    signals: [
      {
        name: 'timeunit',
        value: ['hours'],
        bind: {
          input: 'select',
          options: [['date'], ['day'], ['hours'], ['minutes']],
        },
      },
    ],

    data: [
      {
        name: 'table',
        transform: [
          {
            type: 'timeunit',
            field: 'created_at',
            units: { signal: 'timeunit' },
            signal: 'tbin',
          },
          {
            type: 'aggregate',
            groupby: ['unit0'],
            as: ['count'],
          },
        ],
      },
    ],

    scales: [
      {
        name: 'xscale',
        type: 'band',
        range: 'width',
        padding: 0.05,
        round: true,
        domain: { signal: 'timeSequence(tbin.unit, tbin.start, tbin.stop)' },
      },
      {
        name: 'yscale',
        type: 'linear',
        range: 'height',
        domain: { data: 'table', field: 'count' },
        zero: true,
        nice: true,
      },
    ],

    axes: [
      {
        orient: 'bottom',
        scale: 'xscale',
        formatType: 'time',
        format: { signal: 'timeUnitSpecifier(tbin.units)' },
      },
      {
        orient: 'left',
        scale: 'yscale',
        tickCount: 7,
        title: 'Numero di tweet',
      },
    ],

    marks: [
      {
        type: 'rect',
        from: { data: 'table' },
        encode: {
          update: {
            x: { scale: 'xscale', field: 'unit0' },
            width: { scale: 'xscale', band: 1 },
            y: { scale: 'yscale', field: 'count' },
            y2: { scale: 'yscale', value: 0 },
            fill: { value: 'steelblue' },
            tooltip: {
              signal:
                "{timeunit: timeFormat(datum.unit0, timeUnitSpecifier(tbin.units)), count: format(datum.count, ',') + ' tweets'}",
            },
          },
          hover: {
            fill: { value: 'firebrick' },
          },
        },
      },
    ],
  };
  const wordData = {
    table: result.reduce(
      (accumulator, currentValue) =>
        accumulator.concat({
          ...currentValue,
          created_at: new Date(currentValue.created_at),
        }),
      []
    ),
  };
  return (
    <>
      <Vega spec={spec} data={wordData} />
    </>
  );
};
