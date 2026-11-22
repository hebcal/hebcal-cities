import geoConfig from './geo.js';
import {Location} from '@hebcal/core';

const {countryNames, stateNames, cities} = geoConfig;

export {countryNames, stateNames};

/**
 * @private
 * @param {string} str
 * @return {Location}
 */
function parseCityString(str) {
  const f = str.split('|');
  const cityName = f[0];
  const country = f[1];
  const admin1 = f[2];
  const latitude = +f[3];
  const longitude = +f[4];
  const tzid = f[5];

  const city = new Location(latitude, longitude, country === 'IL',
      tzid, cityName, country);
  if (country === 'US') {
    city.state = admin1;
  } else if (admin1) {
    city.admin1 = admin1;
  }
  return city;
}

/**
 * @param {Location[]} locations
 * @return {Map<string,Location>}
 */
function loadCities(locations) {
  const cities = new Map();
  for (const city of locations) {
    const cityLc = city.getName().toLowerCase();
    // when a name appears more than once, the earliest row wins
    if (!cities.has(cityLc)) {
      cities.set(cityLc, city);
    }
  }
  // this is silly, but alias the first occurrence of each country
  for (const city of locations) {
    const cc = city.getCountryCode();
    if (cc === 'US') {
      const stateLc = stateNames[city.state].toLowerCase();
      if (!cities.has(stateLc)) {
        cities.set(stateLc, city);
      }
    } else {
      const countryLc = countryNames[cc].toLowerCase();
      if (!cities.has(countryLc)) {
        cities.set(countryLc, city);
      }
    }
  }
  return cities;
}

/**
 * @param {Map<string,Location>} cities
 * @param {Map<string,Location>} byCcName first location for each `cc-name` key
 */
function initCityAliases(cities, byCcName) {
  const aliasMap = {
    // CC-geo.json name: [ alias1, alias2, alias3 ...]
    // country/state names whose first row in geo.json isn't the right city
    'US-Newark': ['New Jersey'],
    'AR-Buenos Aires': ['Argentina'],
    'RU-Moscow': ['Russia'],
    'EG-Cairo': ['Egypt'],
    'VE-Caracas': ['Venezuela'],
    // cities
    'US-New York': ['nyc', 'n y c', 'new york city', 'new york new york'],
    'IL-Beer Sheva': ['beersheba', 'beer sheba'],
    'US-The Bronx': ['bronx', 'bronx new york'],
    'US-Los Angeles': ['la', 'l a'],
    'US-Washington': ['dc', 'd c', 'washington dc', 'washington d c'],
    'GB-London': ['england', 'great britain', 'britain', 'united kingdom'],
    'GB-Glasgow': ['scotland'],
    'GB-Belfast': ['northern ireland'],
    'GB-Cardiff': ['wales'],
    'US-South Lake Tahoe': ['lake tahoe', 'tahoe'],
    'US-Las Vegas': ['vegas'],
    'FR-Marseille': ['Marseilles'],
    'PA-Panama': ['Panama City'],
    'IL-Petah Tiqwa': ['Petach Tikvah', 'Petach Tikva', 'Petah Tikvah', 'Petah Tikva'],
    'IL-Bene Beraq': ['Bnei Brak'],
    'UA-Kyiv': ['Kiev'],
  };
  const ccCityMap = {
    'Ashdod': 'IL-Ashdod',
    'Atlanta': 'US-Atlanta-GA',
    'Austin': 'US-Austin-TX',
    'Baghdad': 'IQ-Baghdad',
    'Beer Sheva': 'IL-Beer Sheva',
    'Berlin': 'DE-Berlin',
    'Baltimore': 'US-Baltimore-MD',
    'Bogota': 'CO-Bogota',
    'Boston': 'US-Boston-MA',
    'Buenos Aires': 'AR-Buenos Aires',
    'Buffalo': 'US-Buffalo-NY',
    'Chicago': 'US-Chicago-IL',
    'Cincinnati': 'US-Cincinnati-OH',
    'Cleveland': 'US-Cleveland-OH',
    'Dallas': 'US-Dallas-TX',
    'Denver': 'US-Denver-CO',
    'Detroit': 'US-Detroit-MI',
    'Eilat': 'IL-Eilat',
    'Gibraltar': 'GI-Gibraltar',
    'Haifa': 'IL-Haifa',
    'Hawaii': 'US-Honolulu-HI',
    'Houston': 'US-Houston-TX',
    'Jerusalem': 'IL-Jerusalem',
    'Johannesburg': 'ZA-Johannesburg',
    'La Paz': 'BO-La Paz',
    'Livingston': 'US-Livingston-NY',
    'London': 'GB-London',
    'Los Angeles': 'US-Los Angeles-CA',
    'Miami': 'US-Miami-FL',
    'Melbourne': 'AU-Melbourne',
    'Mexico City': 'MX-Mexico City',
    'Montreal': 'CA-Montreal',
    'Moscow': 'RU-Moscow',
    'New York': 'US-New York-NY',
    'Omaha': 'US-Omaha-NE',
    'Ottawa': 'CA-Ottawa',
    'Panama City': 'PA-Panama City',
    'Paris': 'FR-Paris',
    'Petach Tikvah': 'IL-Petach Tikvah',
    'Philadelphia': 'US-Philadelphia-PA',
    'Phoenix': 'US-Phoenix-AZ',
    'Pittsburgh': 'US-Pittsburgh-PA',
    'Saint Louis': 'US-Saint Louis-MO',
    'Saint Petersburg': 'RU-Saint Petersburg',
    'San Francisco': 'US-San Francisco-CA',
    'Seattle': 'US-Seattle-WA',
    'Sydney': 'AU-Sydney',
    'Tel Aviv': 'IL-Tel Aviv',
    'Tiberias': 'IL-Tiberias',
    'Toronto': 'CA-Toronto',
    'Vancouver': 'CA-Vancouver',
    'White Plains': 'US-White Plains-NY',
    'Washington DC': 'US-Washington-DC',
    'Bene Beraq': 'IL-Bnei Brak',
  };
  for (const [key, aliases] of Object.entries(aliasMap)) {
    const keyLc = key.toLowerCase();
    const cc = keyLc.substring(0, 2);
    const cityLc = keyLc.substring(3);
    const location = byCcName.get(keyLc);
    if (!location) {
      throw new Error(`@hebcal/cities: alias target ${key} not found`);
    }
    // When a name exists in several countries, the alias table decides
    cities.set(cityLc, location);
    cities.set(keyLc, location);
    for (const a of aliases) {
      const aliasLc = a.toLowerCase();
      cities.set(aliasLc, location);
      cities.set(`${cc}-${aliasLc}`, location);
    }
  }
  for (const [city, alias] of Object.entries(ccCityMap)) {
    const cityLc = city.toLowerCase();
    const aliasLc = alias.toLowerCase();
    const cc = aliasLc.substring(0, 2);
    const ccCityLc = `${cc}-${cityLc}`;
    // city may itself be an alias (e.g. 'Petach Tikvah', 'Hawaii')
    const location = byCcName.get(ccCityLc) || cities.get(ccCityLc) ||
      cities.get(cityLc);
    if (!location || location.getCountryCode().toLowerCase() !== cc) {
      throw new Error(`@hebcal/cities: ${alias} does not resolve to ${city}`);
    }
    cities.set(ccCityLc, location);
    cities.set(aliasLc, location);
  }
}

const locations = cities.map(parseCityString);
const byCcName = new Map();
for (const location of locations) {
  const key = `${location.getCountryCode()}-${location.getName()}`.toLowerCase();
  if (!byCcName.has(key)) {
    byCcName.set(key, location);
  }
}
const cityMap = loadCities(locations);
initCityAliases(cityMap, byCcName);
for (const [cityName, location] of cityMap.entries()) {
  Location.addLocation(cityName, location);
}
