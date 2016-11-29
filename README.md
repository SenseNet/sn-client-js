# sn-client-js

[![gitter](https://img.shields.io/gitter/room/SenseNet/SN7ClientAPI.svg)](https://gitter.im/SenseNet/SN7ClientAPI)
[![travis](https://img.shields.io/travis/SenseNet/sn-client-js.svg)](https://travis-ci.org/SenseNet/sn-client-js)
[![coverage](https://img.shields.io/codecov/c/github/SenseNet/sn-client-js.svg)](https://codecov.io/gh/SenseNet/sn-client-js)
[![npm](https://img.shields.io/npm/v/sn-client-js.svg)](https://www.npmjs.com/package/sn-client-js)
[![downloads](https://img.shields.io/github/downloads/SenseNet/sn-client-js/total.svg)](https://github.com/SenseNet/sn-client-js)
[![license](https://img.shields.io/github/license/SenseNet/sn-client-js.svg)](https://github.com/SenseNet/sn-client-js/LICENSE.txt)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This component lets you work with the SenseNet ECM Content Repository (create or manage content, execute queries, etc.) by providing a JavaScript client API for the main content 
operations.

This library connects to a SenseNet portal's REST API, but hides the underlying HTTP requests. You can work with simple load or create Content operations in JavaScript, instead of 
having to construct ajax requests yourself.

It also provides you the full SenseNet Content Type system hierarchy through Typescript classes with all the fields defined in the CTDs and the Content Type schemas with FieldSettings
so that you can manage Content easy on client-side knowing the related fields and their settings.

### Examples

#### Creating a Folder with the name 'Hello world'
 
```ts
let content = new SenseNet.ContentTypes.Folder({ DisplayName: 'Hello world!' });
```

or

```ts
let content = SenseNet.Content.Create('Folder', { DisplayName: 'Hello world!' });
```

#### Load a Content by its id
 
```ts
var content = SenseNet.Content.load(1234, 'A.1', { expand: 'Avatar' });
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

#### Get the Schema of the given ContentType
 
```javascript
let schema = SenseNet.Content.GetSchema('GenericContent');
```

#### Read Collection data
 
```ts
let collection = new Collection([]);
var options = new ODataAPI.ODataParams({ 
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

#### Delete a Content from a Collection
 
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