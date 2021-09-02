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
});
```
Get data from work hour management system

```ts
import whms from 'whms';

whms.get({
	method: "getProjects",
	data: {}
});

whms.get({
	method: "getWorkRecord",
	data: {
		workRecordEmployeeId: 69;
		workRecordCreateDate: new Date().getTime(); // only accept timestamp
	}
});

whms.get({
	method: "getEmployees",
	data: {
		employeeShowDisabled: true 
	}
});
```

Post data to work hour management system

```ts
import whms from 'whms';

whms.post({
	method: "addWorkRecord",
	data: {
		workRecordList: [] // Array<WorkRecord> length should be 22
	}
});
```

Generate Work Record List

```ts
import whms from 'whms';

const employee = {
	id: 69,
	code: "",
	name: "John Doe",
	account: "johndoe",
	password: "password",
	tel: "123-45678",
	ext: "234",
	email: "johndoe@example.com",
	enabled: true
}

const wrList = whms.generateWorkReocrd({
	employee: employee, // employee object
	projectId: 10, // project index
	content: "This is a content.",
	createDate: 0
});

console.log(wrList.length); // always return 22
```


## Upload Config
```js
{
    // `employeeAccount` is account name not user name
	// provide account name to upload method will automatically search employees list and return match employee
    employeeAccount: "johndoe",
    projectCode: "C000",
    content: "This is a content",

    // date format: "yyyy-MM-dd"
    dateStart: "2021-09-06",
    dateEnd: "2021-09-08",
	passHoliday: true,
    exclude: ["2021-09-07"]
}
```