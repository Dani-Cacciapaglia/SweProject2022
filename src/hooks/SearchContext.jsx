import { createContext } from 'react';

export const SearchContext = createContext({
  result: null,
  setResult: () => () => null,
});
