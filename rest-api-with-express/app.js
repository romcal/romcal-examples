import express from 'express';
import { Romcal } from 'romcal';
import { France_Fr as FranceFR } from '@romcal/calendar.france';
import * as Roman from '@romcal/calendar.general-roman';
import { fileURLToPath } from 'url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Initialize the Express.js server.
 * @type {*|Express}
 */
const app = express();
export default app;

/**
 * Wire an index HTML page to the URL root of this server.
 */
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

/**
 * Example that output data of the General Roman calendar, and all its defined locales.
 * The year is optional (taking the current year by default).
 */
app.get('/romcal/general-roman/:locale/{:year}', async (req, res) => {
  const locale = req.params.locale.toLowerCase();
  const localeIndex = Romcal.LOCALE_IDS.indexOf(locale);

  // Check if the provided locale exists in the `general_roman` calendar. If no, return a 404 error.
  if (localeIndex === -1) {
    const code = 404;
    return res.status(code).send({ code, message: "The provided locale doesn't exists" });
  }

  // Load dynamically the localized General Roman Calendar
  const localeVarName = Romcal.LOCALE_VAR_NAMES[localeIndex];
  const localizedCalendar = Roman[`GeneralRoman_${localeVarName}`];

  // Initialize a romcal object with the General Roman Calendar data.
  const romcalGeneralRoman = new Romcal({ localizedCalendar });

  try {
    // Generate a liturgical calendar with the provided locale and year.
    const { year } = req.params;
    const data = await romcalGeneralRoman.generateCalendar(year);

    // Finally, send the computed data.
    return res.json(data);
  } catch (e) {
    // If romcal return an error, we must manage and display it through Express.
    const code = 500;
    return res.status(code).send({ code, message: e.message });
  }
});

/**
 * Simple example with only 1 supported calendar and locale by the REST API:
 * the calendar of France and the `fr` locale.
 */
const romcalFranceFr = new Romcal({ localizedCalendar: FranceFR });
app.get('/romcal/france/fr/{:year}', async (req, res) => {
  const { year } = req.params;
  try {
    const data = await romcalFranceFr.generateCalendar(year);
    res.json(data);
  } catch (e) {
    // If romcal return an error, we must manage and display it through Express.
    const code = 500;
    res.status(code).send({ code, message: e.message });
  }
});
