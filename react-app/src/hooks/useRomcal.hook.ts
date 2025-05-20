import { useMemo } from 'react';
import { type LiturgicalCalendar, Romcal, type LiturgicalDay, type BaseRomcalBundle } from 'romcal';
import { camelCase, upperFirst } from 'lodash';
import { CALENDARS } from '../constants/calendars';
import { useQuery } from '@tanstack/react-query';

export type MonthlyData = Record<number, LiturgicalDay[][]>;

const lazyLoad = async (pkgName: string): Promise<Record<string, BaseRomcalBundle>> => {
  return CALENDARS[pkgName]();
};

const romcalQuery = async (calendarKey: string, localeKey: string, year: number): Promise<MonthlyData> => {
  const index = Object.keys(CALENDARS).indexOf(calendarKey);
  if (index === -1) throw new Error(`Calendar ${calendarKey} not found`);

  const bundle = await lazyLoad(calendarKey);
  const localizedCalendar = bundle[`${calendarKey}_${localeKey}`];

  const romcal = new Romcal({ localizedCalendar });
  const data = (await romcal.generateCalendar(year).then(Object.values)) as LiturgicalCalendar;

  return Object.values(data).reduce<MonthlyData>(
    (acc, days) => {
      const month = new Date(days[0].date).getUTCMonth() + 1;
      if (!acc[month]) acc[month] = [];
      acc[month].push(days);
      return acc;
    },
    { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [] }
  );
};

export const useRomcal = (calendarKey: string, localeKey: string, year: number) => {
  const formattedCalendarKey = useMemo(
    () => calendarKey.split('_').map(camelCase).map(upperFirst).join('_'),
    [calendarKey]
  );
  const formattedLocaleKey = useMemo(() => upperFirst(camelCase(localeKey)), [localeKey]);

  return useQuery({
    queryKey: [formattedCalendarKey, formattedLocaleKey, year],
    queryFn: () => romcalQuery(formattedCalendarKey, formattedLocaleKey, year),
  });
};
