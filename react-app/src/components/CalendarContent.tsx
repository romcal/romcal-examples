import { useMemo } from 'react';
import { styled } from '@mui/material/styles';

import { useRomcal } from '../hooks/useRomcal.hook';
import { useNavigateCalendar } from '../hooks/useNavigateCalendar.hook';
import { useVariant } from '../hooks/useVariant.hook';

import { Day } from './Day';
import { LoadingIndicator } from './LoadingIndicator';

const MonthContainer = styled('div')`
  padding: 30px 10px;
`;

export const CalendarContent = () => {
  const variant = useVariant();
  const { localeKey, calendarKey, year, month } = useNavigateCalendar();
  const { isLoading, data } = useRomcal(calendarKey, localeKey, year);
  const currentMonth = useMemo(() => data?.[month] ?? [], [data, month]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <MonthContainer>
      {currentMonth.map((day) => (
        <Day liturgicalDay={day} key={day[0].date} variant={variant} />
      ))}
    </MonthContainer>
  );
};
