import test from 'ava';
import {Location} from '@hebcal/core';
import './cities.js';

test('lookup', (t) => {
  let city = Location.lookup('Rishon LeZiyyon');
  t.is(city.getLatitude(), 31.97102);
  t.is(city.getLongitude(), 34.78939);
  t.is(city.getTzid(), 'Asia/Jerusalem');
  t.is(city.getCountryCode(), 'IL');

  city = Location.lookup('El Paso');
  t.is(city.getLatitude(), 31.75872);
  t.is(city.getLongitude(), -106.48693);
  t.is(city.getTzid(), 'America/Denver');
  t.is(city.getCountryCode(), 'US');

  city = Location.lookup('Zurich');
  t.is(city.getLatitude(), 47.36667);
  t.is(city.getLongitude(), 8.55);
  t.is(city.getTzid(), 'Europe/Zurich');
  t.is(city.getCountryCode(), 'CH');

  city = Location.lookup('Dublin');
  t.is(city.getLatitude(), 53.33306);
  t.is(city.getLongitude(), -6.24889);
  t.is(city.getTzid(), 'Europe/Dublin');
  t.is(city.getCountryCode(), 'IE');
});

test('alias-cc-cityName', (t) => {
  const classic = [
    'IL-Ashdod', 'US-Atlanta-GA', 'US-Austin-TX', 'IQ-Baghdad', 'IL-Beer Sheva',
    'DE-Berlin', 'US-Baltimore-MD', 'CO-Bogota', 'US-Boston-MA', 'AR-Buenos Aires',
    'US-Buffalo-NY', 'US-Chicago-IL', 'US-Cincinnati-OH', 'US-Cleveland-OH',
    'US-Dallas-TX', 'US-Denver-CO', 'US-Detroit-MI', 'IL-Eilat', 'GI-Gibraltar',
    'IL-Haifa', 'US-Honolulu-HI', 'US-Houston-TX', 'IL-Jerusalem', 'ZA-Johannesburg',
    'UA-Kiev', 'BO-La Paz', 'US-Livingston-NY', 'GB-London', 'US-Los Angeles-CA',
    'US-Miami-FL', 'AU-Melbourne', 'MX-Mexico City', 'CA-Montreal', 'RU-Moscow',
    'US-New York-NY', 'US-Omaha-NE', 'CA-Ottawa', 'PA-Panama City', 'FR-Paris',
    'IL-Petach Tikvah', 'US-Philadelphia-PA', 'US-Phoenix-AZ', 'US-Pittsburgh-PA',
    'US-Saint Louis-MO', 'RU-Saint Petersburg', 'US-San Francisco-CA', 'US-Seattle-WA',
    'AU-Sydney', 'IL-Tel Aviv', 'IL-Tiberias', 'CA-Toronto', 'CA-Vancouver',
    'US-White Plains-NY', 'US-Washington-DC', 'IL-Bnei Brak',
  ];
  for (const s of classic) {
    const city = Location.lookup(s);
    t.is(typeof city, 'object', s);
  }
});

test('alias-cc', (t) => {
  t.is(Location.lookup('France').getName(), 'Paris');
  t.is(Location.lookup('Russia').getName(), 'Moscow');
  t.is(Location.lookup('United Kingdom').getName(), 'London');
  t.is(Location.lookup('Brazil').getName(), 'Sao Paulo');
  t.is(Location.lookup('Mexico').getName(), 'Mexico City');
  t.is(Location.lookup('Argentina').getName(), 'Buenos Aires');
  t.is(Location.lookup('Greece').getName(), 'Athens');
});

test('alias-city', (t) => {
  t.is(Location.lookup('NYC').getName(), 'New York');
  t.is(Location.lookup('Vegas').getName(), 'Las Vegas');
  t.is(Location.lookup('Scotland').getName(), 'Glasgow');
});

test('alias-us-state', (t) => {
  t.is(Location.lookup('California').getName(), 'Los Angeles');
  t.is(Location.lookup('Massachusetts').getName(), 'Boston');
});

test('notfound', (t) => {
  const city = Location.lookup('**does not exist**');
  t.is(city, undefined);
});

test('alias-city-with-country', (t) => {
  t.is(Location.lookup('IL-Petah Tikva').getName(), 'Petah Tiqwa');
  t.is(Location.lookup('IL-Bene Beraq').getName(), 'Bene Beraq');
});

test('kyiv', (t) => {
  t.is(Location.lookup('Kyiv').getName(), 'Kyiv');
  t.is(Location.lookup('UA-Kiev').getName(), 'Kyiv');
  t.is(Location.lookup('UA-Kyiv').getName(), 'Kyiv');
  t.is(Location.lookup('Kiev').getName(), 'Kiev');
});
