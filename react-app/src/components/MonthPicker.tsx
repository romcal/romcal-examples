import React from 'react';
import styled from '@emotion/styled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, IconButton } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import { useNavigateCalendar } from '../hooks/useNavigateCalendar.hook';

const Container = styled('div')`
  margin-top: 20px;
  display: inline-flex;
`;

export const MonthPicker = () => {
  const { previousMonth, nextMonth, date, setDate } = useNavigateCalendar();

  const datePickerChange = (newValue: Date | null) => {
    if (newValue) {
      setDate(newValue);
    }
  };

  return (
    <Container>
      <Box sx={{ marginRight: 1, marginTop: 1 }}>
        <IconButton color="primary" onClick={previousMonth}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Box sx={{ minWidth: 120 }}>
        <DatePicker
          label="Month and Year"
          views={['year', 'month']}
          minDate={new Date('1969-01-01')}
          value={date}
          onChange={datePickerChange}
        />
      </Box>
      <Box sx={{ marginLeft: 1, marginTop: 1 }}>
        <IconButton color="primary" onClick={nextMonth}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Container>
  );
};
