import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { FC } from 'react';

import CalendarMenu from './CalendarMenu';
import LocaleMenu from './LocaleMenu';
import MonthPicker from './MonthPicker';

const Container = styled(Grid)`
  margin-bottom: 0;
`;

const Group = styled('div')`
  margin-top: 20px;
  display: inline-flex;
`;

const CalendarToolbar: FC = () => {
  return (
    <Container container direction="row" justifyContent="space-between" alignItems="center">
      <MonthPicker />
      <Group>
        <CalendarMenu />
        <LocaleMenu />
      </Group>
    </Container>
  );
};

export default CalendarToolbar;
