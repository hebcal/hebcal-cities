import {test} from 'node:test';
import assert from 'node:assert';
import {Location} from '@hebcal/core';
import '../src/cities.js';

test('lookup', () => {
  let city = Location.lookup('Rishon LeZiyyon');
  assert.strictEqual(city.getLatitude(), 31.97102);
  assert.strictEqual(city.getLongitude(), 34.78939);
  assert.strictEqual(city.getTzid(), 'Asia/Jerusalem');
  assert.strictEqual(city.getCountryCode(), 'IL');

  city = Location.lookup('El Paso');
  assert.strictEqual(city.getLatitude(), 31.75872);
  assert.strictEqual(city.getLongitude(), -106.48693);
  assert.strictEqual(city.getTzid(), 'America/Denver');
  assert.strictEqual(city.getCountryCode(), 'US');

  city = Location.lookup('Zurich');
  assert.strictEqual(city.getLatitude(), 47.36667);
  assert.strictEqual(city.getLongitude(), 8.55);
  assert.strictEqual(city.getTzid(), 'Europe/Zurich');
  assert.strictEqual(city.getCountryCode(), 'CH');

  city = Location.lookup('Dublin');
  assert.strictEqual(city.getLatitude(), 53.33306);
  assert.strictEqual(city.getLongitude(), -6.24889);
  assert.strictEqual(city.getTzid(), 'Europe/Dublin');
  assert.strictEqual(city.getCountryCode(), 'IE');
});

test('alias-cc-cityName', () => {
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
    assert.strictEqual(typeof city, 'object', s);
  }
});

test('alias-cc', () => {
  assert.strictEqual(Location.lookup('France').getName(), 'Paris');
  assert.strictEqual(Location.lookup('Russia').getName(), 'Moscow');
  assert.strictEqual(Location.lookup('United Kingdom').getName(), 'London');
  assert.strictEqual(Location.lookup('Brazil').getName(), 'Sao Paulo');
  assert.strictEqual(Location.lookup('Mexico').getName(), 'Mexico City');
  assert.strictEqual(Location.lookup('Argentina').getName(), 'Buenos Aires');
  assert.strictEqual(Location.lookup('Greece').getName(), 'Athens');
});

test('alias-city', () => {
  assert.strictEqual(Location.lookup('NYC').getName(), 'New York');
  assert.strictEqual(Location.lookup('Vegas').getName(), 'Las Vegas');
  assert.strictEqual(Location.lookup('Scotland').getName(), 'Glasgow');
});

test('alias-us-state', () => {
  assert.strictEqual(Location.lookup('California').getName(), 'Los Angeles');
  assert.strictEqual(Location.lookup('Massachusetts').getName(), 'Boston');
});

test('notfound', () => {
  const city = Location.lookup('**does not exist**');
  assert.strictEqual(city, undefined);
});

test('alias-city-with-country', () => {
  assert.strictEqual(Location.lookup('IL-Petah Tikva').getName(), 'Petah Tiqwa');
  assert.strictEqual(Location.lookup('IL-Bene Beraq').getName(), 'Bene Beraq');
});

test('kyiv', () => {
  assert.strictEqual(Location.lookup('Kyiv').getName(), 'Kyiv');
  assert.strictEqual(Location.lookup('UA-Kiev').getName(), 'Kyiv');
  assert.strictEqual(Location.lookup('UA-Kyiv').getName(), 'Kyiv');
  assert.strictEqual(Location.lookup('Kiev').getName(), 'Kyiv');
});
