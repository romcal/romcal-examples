import { styled } from '@mui/material/styles';
import { observer } from 'mobx-react';
import React, { useContext } from 'react';

import { AppContext } from '../AppContext';

import Day from './Day';
import LoadingIndicator from './LoadingIndicator';

const MonthContainer = styled('div')`
  padding: 30px 10px;
`;

const CalendarContent = observer(() => {
  const {
    stores: { romcalStore },
    variant,
  } = useContext(AppContext);
  const { fetchingData, monthlyData } = romcalStore;

  if (monthlyData.length === 0 && !fetchingData) {
    romcalStore.getMonthData();
  }

  if (fetchingData) {
    return <LoadingIndicator />;
  }

  return (
    <MonthContainer>
      {monthlyData.map((day) => (
        <Day liturgicalDay={day} key={day[0].date} variant={variant} />
      ))}
    </MonthContainer>
  );
});

export default CalendarContent;
