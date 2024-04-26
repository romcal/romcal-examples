import * as React from 'react';

import { RomcalStore } from './stores';
import { DayVariant } from './components/Day';

export const variant: DayVariant = (import.meta.env.VITE_DAY_VARIANT as DayVariant) ?? DayVariant.Simple;

export function createStores() {
  return { romcalStore: new RomcalStore() };
}

export const stores = createStores();

export const AppContext = React.createContext({ stores, variant });
