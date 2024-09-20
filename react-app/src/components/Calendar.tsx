import React from 'react';

import { CalendarContent } from './CalendarContent';
import { CalendarToolbar } from './CalendarToolbar';

export const Calendar = () => {
  return (
    <>
      <CalendarToolbar />
      <CalendarContent />
    </>
  );
};
