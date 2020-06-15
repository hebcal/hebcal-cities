/// <reference types="node"/>

declare module '@hebcal/cities' {
    /**
     * Interface to lookup cities
     */
    export namespace cities {
        /**
         * A City result
         * @property name - Short city name
         * @property tzid - Timezone Identifier (for tzdata/Olson tzdb)
         * @property cc - ISO 3166 two-letter country code
         * @property cityName - longer city name with US State or country code
         * @property [state] - U.S. State name (only if cc='US')
         * @property [geoid] - optional numerical geoid
         */
        export type CityResult = {
            name: string;
            latitude: number;
            longitude: number;
            tzid: string;
            cc: string;
            cityName: string;
            state?: string;
            geoid?: number;
        };

        /**
         * Looks up a city
         * @param str - city name (such as "San Francisco" or "Jerusalem")
         */
        function getCity(str: string): CityResult;
        /**
         * Parses `geo.json`; must be called before `getCity()`
         */
        function init(): void;
    }
}
