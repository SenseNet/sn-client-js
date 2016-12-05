# sn-client-js

[![Gitter chat](https://img.shields.io/gitter/room/SenseNet/SN7ClientAPI.svg?style=flat)](https://gitter.im/SenseNet/SN7ClientAPI)
[![Build status](https://img.shields.io/travis/SenseNet/sn-client-js.svg?style=flat)](https://travis-ci.org/SenseNet/sn-client-js)
[![Coverage](https://img.shields.io/codecov/c/github/SenseNet/sn-client-js.svg?style=flat)](https://codecov.io/gh/SenseNet/sn-client-js)
[![NPM version](https://img.shields.io/npm/v/sn-client-js.svg?style=flat)](https://www.npmjs.com/package/sn-client-js)
[![NPM downloads](https://img.shields.io/npm/dt/sn-client-js.svg?style=flat)](https://www.npmjs.com/package/sn-client-js)
[![License](https://img.shields.io/github/license/SenseNet/sn-client-js.svg?style=flat)](https://github.com/SenseNet/sn-client-js/LICENSE.txt)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat)](http://commitizen.github.io/cz-cli/)

This component lets you work with the [SenseNet ECM](https://github.com/SenseNet) Content Repository (create or manage content, execute queries, etc.) by providing a JavaScript client API for the main content 
operations.

This library connects to a SenseNet portal's REST API, but hides the underlying HTTP requests. You can work with simple load or create Content operations in JavaScript, instead of 
having to construct ajax requests yourself.

It also provides you the full SenseNet Content Type system hierarchy through Typescript classes with all the fields defined in the CTDs and the Content Type schemas with FieldSettings
so that you can manage Content easy on client-side knowing the related fields and their settings.

### Installation on an existing Sense/Net portal

Get the latest stable version with npm

```
npm install --save sn-client-js
```

or from the [GitHub repository](https://github.com/SenseNet/sn-client-js) and place the downloaded source into your project. If you want to use only the transpiled JavaScript
modules, you can find them in the dist/src folder and import them like

```
var SN = require('/pathtomodule/sn-client-js');
```

If you want to use the module types you can find them in the src folder. Import them the following way:

```
import * as SN from 'sn-client-js';

SN.Content.Create('Folder', { DisplayName: 'My folder' } );
```

### Installation into an external app with node and npm

To install the latest stable version

```
npm install --save sn-client-js
```

Check the ```properties.json``` file in your app's root and change to url to the url of your Sense/Net ECM instance:

```
{
    "sensenet": {
        "url": "https://mysite.com"
    }
}
```

So that you can set the url of your Sense/Net portal that you want to communicate with. To enable your external app to send request against your Sense/Net portal change
your ```Portal.settings```. For further information about cross-origin resource sharing in Sense/Net check [this](http://wiki.sensenet.com/Cross-origin_resource_sharing#Origin_check)
article.

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
var options = new SN.ODataApi.ODataParams({ 
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