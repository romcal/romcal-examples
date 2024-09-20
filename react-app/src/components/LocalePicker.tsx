import type React from 'react';
import { Box, FormControl, InputLabel, NativeSelect } from '@mui/material';
import { Romcal } from 'romcal';

import { useNavigateCalendar } from '../hooks/useNavigateCalendar.hook';

export const LocalePicker = () => {
  const { localeKey, setLocaleKey } = useNavigateCalendar();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocaleKey(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Locale
        </InputLabel>
        <NativeSelect id="calendar" value={localeKey} onChange={handleChange}>
          {Romcal.LOCALE_IDS.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
};
