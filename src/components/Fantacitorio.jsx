import React from 'react';
import { Tab } from '@headlessui/react';
import { FantacitorioTeams } from './FantacitorioTeams';
import { FantacitorioSearch } from './FantacitorioSearch';
import { TabPunteggi } from './FantacitorioPunteggi';

const Fantacitorio = () => {
  return (
    <Tab.Group>
      <Tab.List className="flex flex-row justify-around w-full">
        <Tab
          className={({ selected }) =>
            (selected ? 'font-bold border-b-4 border-sky-300 ' : '') +
            'border-b-2 hover:font-bold'
          }
        >
          Squadre
        </Tab>
        <Tab
          className={({ selected }) =>
            (selected ? 'font-bold border-b-4 border-sky-300 ' : '') +
            'border-b-2 disabled:text-neutral-700 enabled:hover:font-bold'
          }
        >
          Punteggi
        </Tab>
        <Tab
          className={({ selected }) =>
            (selected ? 'font-bold border-b-4 border-sky-300 ' : '') +
            'border-b-2 disabled:text-neutral-700 enabled:hover:font-bold'
          }
        >
          Squadra Utente
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <FantacitorioTeams />
        </Tab.Panel>
        <Tab.Panel>
          <TabPunteggi />
        </Tab.Panel>
        <Tab.Panel>
          <FantacitorioSearch />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Fantacitorio;
