import { Romcal } from 'romcal'; // Import the Romcal library for liturgical calculations
import { Spain_Es } from '@romcal/calendar.spain'; // Import the Spanish locale for Romcal
import assert from 'node:assert';
import { PlaygroundRun } from '../globals';

async function getLiturgicalInfoTest() {
  // Initialize romcal with Spanish calendar
  const romcal = new Romcal({
    localizedCalendar: Spain_Es,
    outputOptions: {
      calculateProperties: true,
    },
  });

  // Get current date in ISO format (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];

  // Get the calendar for the current year
  const calendar = await romcal.generateCalendar(new Date().getFullYear());

  // Get the liturgical day for today
  const todayLiturgy = calendar[today]?.[0];

  if (!todayLiturgy) {
    return null;
  }

  const json = JSON.parse(JSON.stringify(todayLiturgy));
  assert(json.name);

  return json;
}

const run = async () => await getLiturgicalInfoTest();
const name = 'locale.spain_es.upgrade';
const Run: PlaygroundRun = {
  run,
  name,
};

export default Run;
