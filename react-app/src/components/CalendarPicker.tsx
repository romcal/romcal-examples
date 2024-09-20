import type React from 'react';
import { Box, capitalize, FormControl, InputLabel, NativeSelect } from '@mui/material';
import { Romcal } from 'romcal';
import { kebabCase } from 'lodash';

import { useNavigateCalendar } from '../hooks/useNavigateCalendar.hook';

const toHumanName = (str: string): string =>
  capitalize(
    str
      .replace(/_/g, ' / ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/\s([a-z])/g, (c) => ` ${c.toUpperCase()}`)
  );

export const CalendarPicker = () => {
  const { calendarKey, setCalendarKey } = useNavigateCalendar();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value) {
      setCalendarKey(event.target.value);
    }
  };

  return (
    <Box sx={{ minWidth: 120, marginRight: 2 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Calendar
        </InputLabel>
        <NativeSelect id="calendar" value={calendarKey} onChange={handleChange}>
          {Romcal.CALENDAR_VAR_NAMES.map((key) => (
            <option key={key} value={key.split('_').map(kebabCase).join('_')}>
              {toHumanName(key)}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
};
