/// <reference types="node" />
declare module '@hebcal/cities' {
  /**
   * Maps a 2-letter ISO 3166-1 country code (e.g. `'AD'`) to its
   * English country name (e.g. `'Andorra'`).
   */
  export const countryNames: Readonly<Record<string, string>>;

  /**
   * Maps a 2-letter US state/territory code (e.g. `'CA'`) to its
   * English name (e.g. `'California'`).
   */
  export const stateNames: Readonly<Record<string, string>>;
}
