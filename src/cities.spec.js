import test from 'ava';
import {Location} from '@hebcal/core';
import './cities';

test('lookup', (t) => {
  let city = Location.lookup('Rishon LeZiyyon');
  t.is(city.latitude, 31.97102);
  t.is(city.longitude, 34.78939);
  t.is(city.tzid, 'Asia/Jerusalem');
  t.is(city.cc, 'IL');

  city = Location.lookup('El Paso');
  t.is(city.latitude, 31.75872);
  t.is(city.longitude, -106.48693);
  t.is(city.tzid, 'America/Denver');
  t.is(city.cc, 'US');

  city = Location.lookup('Zurich');
  t.is(city.latitude, 47.36667);
  t.is(city.longitude, 8.55);
  t.is(city.tzid, 'Europe/Zurich');
  t.is(city.cc, 'CH');

  city = Location.lookup('Dublin');
  t.is(city.latitude, 53.33306);
  t.is(city.longitude, -6.24889);
  t.is(city.tzid, 'Europe/Dublin');
  t.is(city.cc, 'IE');
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
