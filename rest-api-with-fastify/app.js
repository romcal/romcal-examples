import Fastify from 'fastify';
import { createReadStream } from 'fs';
import { resolve } from 'path';
import { Romcal } from 'romcal';
import * as GeneralRoman from '@romcal/calendar.general-roman';
import { France_Fr as FranceFR } from '@romcal/calendar.france';

const LOG_LEVEL = process.env.ROMCAL_LOG_LEVEL || 'fatal';

const fastify = new Fastify({
  logger: {
    level: LOG_LEVEL,
  },
});

/**
 * Wire an index HTML page to the URL root of this server.
 */
fastify.get('/', async (request, reply) => {
  const stream = createReadStream(resolve('./public/index.html'));
  return reply.type('text/html').send(stream);
});

/**
 * Example that output data of the General Roman calendar, and all its defined locales.
 * The year is optional (taking the current year by default).
 */

const manageGeneralRomanRoute = async (request, reply) => {
  const locale = request.params.locale.toLowerCase();
  const localeIndex = Romcal.LOCALE_IDS.indexOf(locale);

  // Check if the provided locale exists in the `general_roman` calendar. If no, return a 404 error.
  if (localeIndex === -1) {
    const code = 404;
    return reply.status(code).send({ code, message: "The provided locale doesn't exists" });
  }

  const localeVarName = Romcal.LOCALE_VAR_NAMES[localeIndex];
  const localizedCalendar = GeneralRoman[`GeneralRoman_${localeVarName}`];

  // Initialize a romcal object with the General Roman Calendar data.
  const romcalGeneralRoman = new Romcal({ localizedCalendar });

  try {
    // Generate a liturgical calendar with the provided locale and year.
    const { year } = request.params;
    const data = await romcalGeneralRoman.generateCalendar(year);

    // Finally, send the computed data.
    return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(JSON.stringify(data));
  } catch ({ message }) {
    fastify.log.error(message);
    // If romcal return an error, we must manage and display it through Fastify.
    const code = 500;
    return reply.status(code).send({ code, message });
  }
};

fastify.get('/romcal/general-roman/:locale', manageGeneralRomanRoute);
fastify.get('/romcal/general-roman/:locale/:year', manageGeneralRomanRoute);

/**
 * Simple example with only 1 supported calendar and locale by the REST API:
 * the calendar of France and the `fr` locale.
 */

const romcalFranceFr = new Romcal({ localizedCalendar: FranceFR });

const manageFranceFrRoute = async (request, reply) => {
  try {
    const { year } = request.params;
    const data = await romcalFranceFr.generateCalendar(year);
    reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(JSON.stringify(data));
  } catch ({ message }) {
    // If romcal return an error, we must manage and display it through Fastify.
    const code = 500;
    reply.status(code).send({ code, message });
  }
};

fastify.get('/romcal/france/fr', manageFranceFrRoute);
fastify.get('/romcal/france/fr/:year', manageFranceFrRoute);

export default fastify;
