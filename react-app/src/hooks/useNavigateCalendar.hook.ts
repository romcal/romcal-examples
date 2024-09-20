import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DEFAULT_CALENDAR, DEFAULT_LOCALE } from '../constants/settings';

export const useNavigateCalendar = () => {
  const navigate = useNavigate();
  const {
    localeKey = DEFAULT_LOCALE,
    calendarKey = DEFAULT_CALENDAR,
    year = new Date().getFullYear(),
    month = new Date().getMonth() + 1,
  } = useParams();

  const [date, setDate] = useState(new Date(Number(year), Number(month) - 1));

  const navigateToDate = (newDate: Date) => {
    setDate(newDate);
    navigate(`/calendar/${localeKey}/${calendarKey}/${newDate.getFullYear()}/${newDate.getMonth() + 1}`);
  };

  return {
    localeKey,
    setLocaleKey: (key: string) => navigate(`/calendar/${key}/${calendarKey}/${year}/${month}`),
    calendarKey,
    setCalendarKey: (key: string) => navigate(`/calendar/${localeKey}/${key}/${year}/${month}`),
    year: Number(year),
    month: Number(month),
    previousMonth: () => navigateToDate(new Date(Number(year), Number(month) - 2)),
    nextMonth: () => navigateToDate(new Date(Number(year), Number(month))),
    date,
    setDate: navigateToDate,
  };
};
