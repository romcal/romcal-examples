import { type FC } from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { CalendarPicker } from './CalendarPicker';
import { LocalePicker } from './LocalePicker';
import { MonthPicker } from './MonthPicker';

const Container = styled(Grid)`
  margin-bottom: 0;
`;

const Group = styled('div')`
  margin-top: 20px;
  display: inline-flex;
`;

export const CalendarToolbar: FC = () => {
  return (
    <Container container direction="row" justifyContent="space-between" alignItems="center">
      <MonthPicker />
      <Group>
        <CalendarPicker />
        <LocalePicker />
      </Group>
    </Container>
  );
};
