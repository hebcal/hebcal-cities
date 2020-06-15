import geoObject from './geo.json';
import {Location} from '@hebcal/core';

/**
 * Interface to lookup cities
 * @namespace
 */
export const cities = {
  cities: new Map(),

  /**
   * Looks up a city
   * @param {string} str city name (such as "San Francisco" or "Jerusalem")
   * @return {Location}
   */
  lookup(str) {
    return this.cities.get(str.toLowerCase());
  },

  /**
   * Must be called before `lookup()`
   */
  init() {
    const locations = geoObject.cities.map((f) => {
      const cityName = f[0];
      const country = f[1];
      const admin1 = f[2];
      const latitude = +f[3];
      const longitude = +f[4];
      const tzid = f[5];
      const geoid = f[6] ? +f[6] : undefined;
      const city = new Location(latitude, longitude, country == 'IL',
          tzid, cityName, country, geoid);
      if (country == 'US') city.state = admin1;
      return city;
    });
    this.cities = this.loadCities(locations);
    this.initCityAliases();
  },

  /**
   * @param {Location[]} locations
   * @return {Map}
   */
  loadCities(locations) {
    const cities = new Map();
    for (const city of locations) {
      const cityLc = city.getName().toLowerCase();
      cities.set(cityLc, city);
      const shortName = cityLc.substring(0, cityLc.indexOf(','));
      if (!cities.has(shortName)) {
        cities.set(shortName, city);
      }
    }
    // this is silly, but alias the first occurrence of each country
    for (const city of locations) {
      const cc = city.getCountryCode();
      if (cc == 'US') {
        const stateLc = geoObject.stateNames[city.state].toLowerCase();
        if (!cities.has(stateLc)) {
          cities.set(stateLc, city);
        }
      } else {
        const countryLc = geoObject.countryNames[cc].toLowerCase();
        if (!cities.has(countryLc)) {
          cities.set(countryLc, city);
        }
      }
    }
    return cities;
  },

  initCityAliases() {
    const aliasMap = {
      // geo.json name: [ alias1, alias2, alias3 ...]
      'new york': ['nyc', 'n y c', 'new york city', 'new york new york'],
      'beer sheva': ['beersheba'],
      'the bronx': ['bronx', 'bronx new york'],
      'los angeles': ['la', 'l a'],
      'washington': ['dc', 'd c', 'washington dc', 'washington d c'],
      'london': ['england', 'great britain', 'britain'],
      'glasgow': ['scotland'],
      'belfast': ['northern ireland'],
      'cardiff': ['wales'],
      'south lake tahoe': ['lake tahoe', 'tahoe'],
      'las vegas': ['vegas'],
      'Marseille': ['Marseilles'],
      'Panama': ['Panama City'],
      'Petah Tiqwa': ['Petach Tikvah', 'Petach Tikva', 'Petah Tikvah'],
      'Bene Beraq': ['Bnei Brak'],
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
      'Kiev': 'UA-Kiev',
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
    for (const [city, aliases] of Object.entries(aliasMap)) {
      const c = this.cities.get(city.toLowerCase());
      for (const a of aliases) {
        this.cities.set(a.toLowerCase(), c);
      }
    }
    for (const [city, alias] of Object.entries(ccCityMap)) {
      this.cities.set(alias.toLowerCase(), this.cities.get(city.toLowerCase()));
    }
  },
};
