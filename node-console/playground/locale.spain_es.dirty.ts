import { Romcal } from 'romcal'; // Import the Romcal library for liturgical calculations
import { Spain_Es } from '@romcal/calendar.spain';
import assert from 'node:assert';
import { PlaygroundRun } from '../globals'; // Import the Spanish locale for Romcal

const COMPUTED_FIELDS = ['name', 'colorNames', 'seasonNames', 'rankName', 'definition', 'config'];

export async function getLiturgicalInfoTest() {
  // Initialize romcal with Spanish calendar
  const romcal = new Romcal({
    localizedCalendar: Spain_Es,
  });

  // Get current date in ISO format (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];

  // Get the calendar for the current year
  const calendar = await romcal.generateCalendar(new Date().getFullYear());

  // Get the liturgical day for today
  const todayLiturgy = calendar[today]?.[0];

  if (!todayLiturgy) {
    throw new Error('No liturgical day found for today');
  }
  const temp: Record<string, unknown> = {
    ...todayLiturgy,
  };

  // @ts-expect-error need to set fields from the class
  COMPUTED_FIELDS.forEach((field) => (temp[field] = todayLiturgy[field]));

  assert(temp.name);
}
const run = async () => await getLiturgicalInfoTest();
const name = 'locale.spain_es.dirty';
const Run: PlaygroundRun = {
  run,
  name,
};

export default Run;
