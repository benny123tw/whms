# WHMS

A package for testing npm publish.

## Installing

Using npm:

```bash
$ npm install whms
```

## Example

### note: CommonJS usage
In order to gain the TypeScript typings (for intellisense / autocomplete) while using CommonJS imports with `require()` use the following approach:

```js
const whms = require('whms').default;

// whms.<method> will now provide autocomplete and parameter typings
```

Upload Work Reocrd List to database

```ts
import { upload } from 'whms';

upload({
    employeeAccount: "John Doe",
    projectCode: "C000",
    content: "This is a content",
    dateStart: "2021-09-06",
    dateEnd: "2021-09-08",
    passHoliday: true,
    exclude: ["2021-09-07"]
})
```

## Upload Config
```js
{
    employeeAccount: "John Doe",
    projectCode: "C000",
    content: "This is a content",
    dateStart: "2021-09-06",
    dateEnd: "2021-09-08",
	passHoliday: true,
    exclude: ["2021-09-07"]
}
```