# hebcal-cities
Hebcal city database for candle-lighting times

## Installation
```bash
$ npm install @hebcal/cities
```

## Synopsis
```javascript
import {cities} from '@hebcal/cities';

cities.init();
const location = cities.lookup('Athens');
```

<a name="cities"></a>

## cities : <code>object</code>
Interface to lookup cities

**Kind**: global namespace  

* [cities](#cities) : <code>object</code>
    * [.lookup(str)](#cities.lookup) ⇒ <code>Location</code>
    * [.init()](#cities.init)

<a name="cities.lookup"></a>

### cities.lookup(str) ⇒ <code>Location</code>
Looks up a city

**Kind**: static method of [<code>cities</code>](#cities)  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | city name (such as "San Francisco" or "Jerusalem") |

<a name="cities.init"></a>

### cities.init()
Must be called before `lookup()`

**Kind**: static method of [<code>cities</code>](#cities)  
