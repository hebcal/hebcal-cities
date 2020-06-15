/// <reference types="node"/>

import {Location} from '@hebcal/core';

declare module '@hebcal/cities' {
    /**
     * Interface to lookup cities
     */
    export namespace cities {
        /**
         * Looks up a city
         * @param str - city name (such as "San Francisco" or "Jerusalem")
         */
        function lookup(str: string): Location;
        /**
         * Must be called before `getCity()`
         */
        function init(): void;
    }
}
