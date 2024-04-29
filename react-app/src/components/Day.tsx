import { Box, Grid, Tooltip, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import React, {FC} from 'react';
import { BaseLiturgicalDay, LiturgicalDay } from 'romcal';

import AdditionalLineContent from './AdditionalLineContent';
import { startOfDay } from '../utils/date';
import ReactJson from 'react-json-view';

const toPlainObject = (obj: BaseLiturgicalDay): BaseLiturgicalDay => ({
  id: obj.id,
  ...(obj.customLocaleId ? { customLocaleId: obj.customLocaleId } : {}),
  name: obj.name,
  date: obj.date,
  ...(obj.dateExceptions ? { dateExceptions: obj.dateExceptions } : {}),
  dateDef: obj.dateDef,
  precedence: obj.precedence,
  rank: obj.rank,
  rankName: obj.rankName,
  allowSimilarRankItems: obj.allowSimilarRankItems,
  isHolyDayOfObligation: obj.isHolyDayOfObligation,
  isOptional: obj.isOptional,
  i18nDef: obj.i18nDef,
  seasons: obj.seasons,
  seasonNames: obj.seasonNames,
  periods: obj.periods,
  colors: obj.colors,
  colorNames: obj.colorNames,
  martyrology: obj.martyrology,
  titles: obj.titles,
  calendar: obj.calendar,
  cycles: {
    properCycle: obj.cycles.properCycle,
    properCycleName: obj.cycles.properCycleName,
    sundayCycle: obj.cycles.sundayCycle,
    sundayCycleName: obj.cycles.sundayCycleName,
    weekdayCycle: obj.cycles.weekdayCycle,
    weekdayCycleName: obj.cycles.weekdayCycleName,
    psalterWeek: obj.cycles.psalterWeek,
    psalterWeekName: obj.cycles.psalterWeekName,
  },
  fromCalendarId: 'ProperOfTime',
  fromExtendedCalendars: [],
  ...(obj.weekday ? { weekday: toPlainObject(obj.weekday) as LiturgicalDay } : {}),
});

export enum DayVariant {
  Developer =  'developer',
  Simple = 'simple',
}

export type DayProps = {
  liturgicalDay: BaseLiturgicalDay[];
  variant?: DayVariant;
}

const Day: FC<DayProps> = ({ liturgicalDay, variant }) => {
  const date = startOfDay(liturgicalDay[0].date);
  const separator = date.getUTCDay() === 0 ? <WeekSeparator className={'week-separator'} /> : <></>;
  const simple = <DayContainer
    container
    direction="row"
    justifyContent="flex-start"
    alignItems="flex-start"
    className={`dow-${date.getUTCDay()} date-in-month-${date.getUTCDate()} miy-${date.getUTCMonth()} ${variant}-day`}
  >
    <Grid item xs={1}>
      <Box>
        <Tooltip placement="top-start" title={format(date, 'EEEE')}>
          <DayNumber>{date.getUTCDate()}</DayNumber>
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

  let wrapped;

  switch(variant) {
    case DayVariant.Developer:
      wrapped = (
        <>
          {separator}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id={`diy-${date.getUTCDate()}`}
              aria-controls={`diy-${date.getUTCDate()}-content`}
            >
              {simple}
            </AccordionSummary>
            <AccordionDetails>
                <ReactJson
                  src={liturgicalDay.map((obj) => toPlainObject(obj))}
                  displayDataTypes={false}
                  shouldCollapse={(field) => ['dateDef', 'i18nDef', 'weekday'].includes(field.name ?? '')}
                  name={liturgicalDay[0].date}
                />
            </AccordionDetails>
          </Accordion>
        </>
      );
      break;
    case DayVariant.Simple:
    default:
      wrapped = simple;
      break;
  }

  return (
    <>
      {date.getUTCDate() === 1 && <MonthTitle>{format(date, 'MMMM yyyy')}</MonthTitle>}
      {wrapped}
    </>
  );
};

Day.defaultProps = {
  liturgicalDay: undefined,
  variant: DayVariant.Simple,
}

export default Day;

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
