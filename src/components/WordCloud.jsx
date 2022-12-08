import { useContext } from 'react';
import { Vega } from 'react-vega';

import { SearchContext } from '../hooks/SearchContext';

export const WordCloud = () => {
  const { result } = useContext(SearchContext);

  const spec = {
    $schema: 'https://vega.github.io/schema/vega/v5.json',
    width: 768,
    height: 300,
    autosize: { type: 'fit', resize: true, contains: 'padding' },
    data: [
      {
        name: 'table',
        transform: [
          {
            type: 'countpattern',
            field: 'data',
            case: 'upper',
            pattern: '[a-zA-Z]{4,}',
            stopwords:
              "(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall|http|https|dell|dello|della|degli|delle|nella|nelle|sull|sulla|agli|alla|alle|quello|quella|quegli|quelle)",
          },
          {
            type: 'formula',
            as: 'angle',
            expr: '[-45, -40, -35, -30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45][~~(random() * 19)]',
          },
        ],
      },
    ],

    scales: [
      {
        name: 'color',
        type: 'ordinal',
        domain: { data: 'table', field: 'text' },
        range: [
          '#1abc9c',
          '#2ecc71',
          '#3498db',
          '#9b59b6',
          '#f1c40f',
          '#e67e22',
          '#e74c3c',
        ],
      },
    ],

    marks: [
      {
        type: 'text',
        from: { data: 'table' },
        encode: {
          enter: {
            text: { field: 'text' },
            align: { value: 'center' },
            baseline: { value: 'alphabetic' },
            fill: { scale: 'color', field: 'text' },
          },
          update: {
            fillOpacity: { value: 0.75 },
          },
          hover: {
            fillOpacity: { value: 1 },
          },
        },
        transform: [
          {
            type: 'wordcloud',
            text: { field: 'text' },
            rotate: { field: 'datum.angle' },
            fontSize: { field: 'datum.count' },
            fontSizeRange: [10, 60],
            size: [{ signal: 'width' }, { signal: 'height' }],
          },
        ],
      },
    ],
  };
  const wordData = {
    table: result.reduce(
      (accumulator, currentValue) => accumulator.concat(currentValue.text),
      []
    ),
  };
  return (
    <>
      <Vega spec={spec} data={wordData} actions={false} />
    </>
  );
};
