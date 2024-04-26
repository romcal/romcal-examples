import capitalize from '@mui/material/utils/capitalize';
import styled from '@mui/material/styles/styled';
import React from 'react';
import { BaseLiturgicalDay } from 'romcal';

import Colors from './Colors';

const Container = styled('p')`
  margin: 0;
  font-family: 'EB Garamond', serif;
  font-size: 0.9em;
`;

const AdditionalLineContent = (props: { day: BaseLiturgicalDay }) => {
  const { day } = props;
  const rank = ['SUNDAY', 'WEEKDAY'].includes(day.rank) ? null : capitalize(day.rankName);
  const hdo = day.isHolyDayOfObligation && day.calendar.dayOfWeek !== 0 ? '(Holy Day of Obligation)' : null;

  return (
    <Container>
      <Colors colors={day.colors} />
      {day.colors.length && rank ? ',' : ''} {rank} {hdo}
    </Container>
  );
};

export default AdditionalLineContent;
