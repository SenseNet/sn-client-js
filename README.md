# sn-client-js

[![Gitter chat](https://img.shields.io/gitter/room/SenseNet/SN7ClientAPI.svg)](https://gitter.im/SenseNet/SN7ClientAPI)
[![Build status](https://img.shields.io/travis/SenseNet/sn-client-js.svg)](https://travis-ci.org/SenseNet/sn-client-js)
[![Coverage](https://img.shields.io/codecov/c/github/SenseNet/sn-client-js.svg)](https://codecov.io/gh/SenseNet/sn-client-js)
[![NPM version](https://img.shields.io/npm/v/sn-client-js.svg)](https://www.npmjs.com/package/sn-client-js)
[![Downloads](https://img.shields.io/github/downloads/SenseNet/sn-client-js/total.svg)](https://github.com/SenseNet/sn-client-js)
[![License](https://img.shields.io/github/license/SenseNet/sn-client-js.svg)](https://github.com/SenseNet/sn-client-js/LICENSE.txt)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This component lets you work with the SenseNet ECM Content Repository (create or manage content, execute queries, etc.) by providing a JavaScript client API for the main content 
operations.

This library connects to a SenseNet portal's REST API, but hides the underlying HTTP requests. You can work with simple load or create Content operations in JavaScript, instead of 
having to construct ajax requests yourself.

It also provides you the full SenseNet Content Type system hierarchy through Typescript classes with all the fields defined in the CTDs and the Content Type schemas with FieldSettings
so that you can manage Content easy on client-side knowing the related fields and their settings.

### Installation

To install the latest stable version

```
npm install --save sn-client-js
```

### Import

#### CommonJS

```
var SN = require('sn-client-js');

SN.Content.Create('Folder', { DisplayName: 'My folder' } );
```

### Typescript

```
import * as SN from 'sn-client-js';

SN.Content.Create('Folder', { DisplayName: 'My folder' } );
```

### Building sn-client-js

Building the project, running all the unit tests and the ts linter and get the code coverage report, use:

```
gulp
```

### Running tests

To execute all unit tests, use:

```
gulp test
```

### Generatings code coverage report

```
gulp test:coverage
```

### Examples

##### Creating a Folder with the name 'Hello world'
 
```ts
let content = new SN.ContentTypes.Folder({ DisplayName: 'Hello world!' });
```

or

```ts
let content = SN.Content.Create('Folder', { DisplayName: 'Hello world!' });
```

##### Load a Content by its id
 
```ts
var content = SN.Content.load(1234, 'A.1', { expand: 'Avatar' });
content
   .map(response => response.d)
   .subscribe({
   		next: response => {
           //do something with the response
        },
        error: error => console.error('something wrong occurred: ' + error),
        complete: () => console.log('done'),
})
```

##### Get the Schema of the given ContentType
 
```ts
let schema = SN.Content.GetSchema('GenericContent');
```

##### Read Collection data
 
```ts
let collection = new SN.Collection([]);
var options = new SN.ODataAPI.ODataParams({ 
	select: ["DisplayName", "Lead"], 
	orderby: 'DisplayName', 
	metadata: 'no' });

let fetchContent = collection.Read('/NewsDemo/External', options); //gets the list of  the external Articles with their Id, Type and DisplayName fields.
   fetchContent
   	.map(response => response.d.results)
    .subscribe({
    	next: response => {
     		//do something with the response
     	},
     	error: error => console.error('something wrong occurred: ' + error),
     	complete: () => console.log('done'),
	});
```

##### Delete a Content from a Collection
 
```ts
let deleteContent = myCollection.Remove(3);
	deleteContent
	.subscribe({
		next: response => {
			//do something after delete
		},
		error: error => console.error('something wrong occurred: ' + error),
		complete: () => console.log('done'),
	});
```