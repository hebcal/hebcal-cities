import test from 'ava';
import {cities} from './cities';

test.before(() => {
  cities.init();
});

test('lookup', (t) => {
  let city = cities.lookup('Tel Aviv');
  t.is(city.latitude, 32.08088);
  t.is(city.longitude, 34.78057);
  t.is(city.tzid, 'Asia/Jerusalem');
  t.is(city.cc, 'IL');

  city = cities.lookup('Sao Paulo');
  t.is(city.latitude, -23.5475);
  t.is(city.longitude, -46.63611);
  t.is(city.tzid, 'America/Sao_Paulo');
  t.is(city.cc, 'BR');

  city = cities.lookup('London');
  t.is(city.latitude, 51.50853);
  t.is(city.longitude, -0.12574);
  t.is(city.tzid, 'Europe/London');
  t.is(city.cc, 'GB');

  city = cities.lookup('Providence');
  t.is(city.latitude, 41.82399);
  t.is(city.longitude, -71.41283);
  t.is(city.tzid, 'America/New_York');
  t.is(city.cc, 'US');

  city = cities.lookup('Melbourne');
  t.is(city.latitude, -37.814);
  t.is(city.longitude, 144.96332);
  t.is(city.tzid, 'Australia/Melbourne');
  t.is(city.cc, 'AU');
});

test('classic-cities', (t) => {
  const classic = [
    'Ashdod', 'Atlanta', 'Austin', 'Baghdad', 'Beer Sheva',
    'Berlin', 'Baltimore', 'Bogota', 'Boston', 'Budapest',
    'Buenos Aires', 'Buffalo', 'Chicago', 'Cincinnati', 'Cleveland',
    'Dallas', 'Denver', 'Detroit', 'Eilat', 'Gibraltar', 'Haifa',
    'Hawaii', 'Helsinki', 'Houston', 'Jerusalem', 'Johannesburg',
    'Kiev', 'La Paz', 'Livingston', 'Las Vegas', 'London', 'Los Angeles',
    'Marseilles', 'Miami', 'Minneapolis', 'Melbourne', 'Mexico City',
    'Montreal', 'Moscow', 'New York', 'Omaha', 'Ottawa', 'Panama City',
    'Paris', 'Pawtucket', 'Petach Tikvah', 'Philadelphia', 'Phoenix',
    'Pittsburgh', 'Providence', 'Portland', 'Saint Louis', 'Saint Petersburg',
    'San Diego', 'San Francisco', 'Sao Paulo', 'Seattle', 'Sydney',
    'Tel Aviv', 'Tiberias', 'Toronto', 'Vancouver', 'White Plains',
    'Washington DC', 'Worcester',
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
    const city = cities.lookup(s);
    t.is(typeof city, 'object', s);
  }
});

test('alias-cc', (t) => {
  t.is(cities.lookup('France').getName(), 'Paris');
  t.is(cities.lookup('Russia').getName(), 'Moscow');
  t.is(cities.lookup('United Kingdom').getName(), 'London');
  t.is(cities.lookup('Brazil').getName(), 'Sao Paulo');
  t.is(cities.lookup('Mexico').getName(), 'Mexico City');
  t.is(cities.lookup('Argentina').getName(), 'Buenos Aires');
  t.is(cities.lookup('Greece').getName(), 'Athens');
});

test('alias-city', (t) => {
  t.is(cities.lookup('NYC').getName(), 'New York');
  t.is(cities.lookup('Vegas').getName(), 'Las Vegas');
  t.is(cities.lookup('Scotland').getName(), 'Glasgow');
});

test('alias-us-state', (t) => {
  t.is(cities.lookup('California').getName(), 'Los Angeles');
  t.is(cities.lookup('Massachusetts').getName(), 'Boston');
});

test('notfound', (t) => {
  const city = cities.lookup('**does not exist**');
  t.is(city, undefined);
});
