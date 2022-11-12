import { createContext } from 'react';

export const SearchContext = createContext({
  result: null,
  setResult: () => () => null,
  setUserInput: () => () => null,
  setStartTime: () => () => null,
  setEndTime: () => () => null,
  setMaxResults: () => () => null,
});
