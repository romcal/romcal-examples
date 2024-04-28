import React, { FC, useMemo } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import { BaseLiturgicalDay } from 'romcal';
import JsonViewer from '@microlink/react-json-view';
import classNames from 'classnames';

import flatten from '../utils/flatten';
import { startOfDay } from '../utils/date';

import AdditionalLineContent from './AdditionalLineContent';

export enum DayVariant {
  Developer = 'developer',
  Simple = 'simple',
}

export type DayProps = {
  liturgicalDay: BaseLiturgicalDay[];
  variant?: DayVariant;
};

const DayContainer = styled(Grid)`
  margin: 15px 0;
`;

const MonthTitle = styled('h4')`
  font-weight: 100;
  font-family: 'Roboto', sans-serif;
  font-size: 2em;
`;

const DayNumber = styled('h4')`
  font-family: 'EB Garamond', serif;
  font-weight: normal;
  font-size: 30px;
  line-height: 30px;
  text-align: right;
  width: 30px;
  margin: 0;
`;

const MainTitle = styled('h5')`
  font-weight: 500;
  font-family: 'EB Garamond', serif;
  vertical-align: baseline;
  line-height: 30px;
  margin: 0;

  &::before {
    content: '';
    font-size: 25px;
  }
`;

const OptionalTitle = styled('h6')`
  font-weight: 500;
  font-family: 'EB Garamond', serif;
  vertical-align: baseline;
  line-height: 30px;
  margin: 5px 0 0;

  &::before {
    content: '';
    font-size: 25px;
  }
`;

const OrLabel = styled('span')`
  font-size: 19px;
  text-transform: none;
  font-variant: normal;
  font-weight: 400;
`;

const WeekSeparator = styled('hr')`
  position: unset;
  width: 75%;
`;

interface SimpleDayProps {
  date: Date;
  liturgicalDay: BaseLiturgicalDay[];
  variant: DayVariant;
}

const SimpleDay: FC<SimpleDayProps> = ({ date, liturgicalDay, variant }) => {
  const utcDate = date.getUTCDate();
  const utcDay = date.getUTCDay();
  const utcMonth = date.getUTCMonth();
  const simpleClasses =
    variant === DayVariant.Simple ? [`dow-${utcDay}`, `date-in-month-${utcDate}`, `miy-${utcMonth}`] : [];
  return (
    <DayContainer
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      className={classNames([...simpleClasses, `${variant}-day`])}
    >
      <Grid item xs={1}>
        <Box>
          <Tooltip placement="top-start" title={format(date, 'EEEE')}>
            <DayNumber>{utcDate}</DayNumber>
          </Tooltip>
        </Box>
      </Grid>
      <Grid item xs>
        <Box>
          <MainTitle className={liturgicalDay[0].rank.toLowerCase()}>{liturgicalDay[0].name}</MainTitle>
          <AdditionalLineContent day={liturgicalDay[0]} />
          {liturgicalDay.length > 1 &&
            liturgicalDay.slice(1).map((altDay) => (
              <div key={altDay.id}>
                <OptionalTitle key={altDay.id} className={altDay.rank.toLowerCase()}>
                  {altDay.isOptional ? <OrLabel>or: </OrLabel> : <></>}
                  {altDay.name}
                </OptionalTitle>
                <AdditionalLineContent day={altDay} />
              </div>
            ))}
        </Box>
      </Grid>
    </DayContainer>
  );
};

const Day: FC<DayProps> = ({ liturgicalDay, variant }) => {
  const date = startOfDay(liturgicalDay[0].date);
  const utcDate = date.getUTCDate();
  const utcDay = date.getUTCDay();
  const utcMonth = date.getUTCMonth();
  const simple = useMemo(
    () => <SimpleDay date={date} liturgicalDay={liturgicalDay} variant={variant ?? DayVariant.Simple} />,
    [date, liturgicalDay, variant]
  );

  const separator = utcDay === 0 ? <WeekSeparator className="week-separator" /> : <></>;
  let wrapped = simple;
  switch (variant) {
    case DayVariant.Developer:
      wrapped = (
        <>
          {separator}
          <Accordion
            className={classNames([`dow-${utcDay}`, `date-in-month-${utcDate}`, `miy-${utcMonth}`])}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id={`diy-${utcDate}`}
              aria-controls={`diy-${utcDate}-content`}
            >
              {simple}
            </AccordionSummary>
            <AccordionDetails>
              <JsonViewer src={liturgicalDay.map(flatten)} name={liturgicalDay[0].date} />
            </AccordionDetails>
          </Accordion>
        </>
      );
      break;
    case DayVariant.Simple:
    default:
      break;
  }
  return (
    <>
      {utcDate === 1 && <MonthTitle>{format(date, 'MMMM yyyy')}</MonthTitle>}
      {wrapped}
    </>
  );
};

Day.defaultProps = {
  variant: DayVariant.Simple,
};

export default Day;
