Introduction
-----------------

Welcome to version 0.1 alpha of *SenseNet TypeScript Client API* docs. You will find here the list of the currently available API calls on a ```Content``` or a ```Collection``` in the SenseNet 
Content Repository
and other helper stuff that make working with Sense/Net more fun.

The documentation is organized into modules which contain various components of a Sense/Net application.

## Main concept

Building applications with Sense/Net as a front-end developer in the ASP.NET way had a long learning curve with the tons of views and templates and was a bit inflexible too. 
Sense/Net's OData REST API seems very promising at the start because of the possibility of writing our applications only in JavaScript and using all the cool frameworks and tools
available thanks to the JavaScript community, but some of the key parts of the system were hidden or hard to access on client-side, so we detected the need of a new layer: a new API
to satisfy the needs of front-end developers.

![SN7 ClientJS concept](http://download.sensenet.com/aniko/sn7/jsapidocs/img/sn7.client.js.png "SN7 ClientJS concept")

Our main goal is to create a layer that handles communication between client and server and allows you to use your preferred framework to create the view layer. It doesn't matter
which framework do you prefer, SN7 will provide you a bridge to achieve your project goals.

First of all in SN7 we'll publish the whole ```ContentType``` hierarchy as TypeScript classes with all the benefits of our type tree (e.g. inheritance). These classes will be generated
from the content type definitions in SenseNet, even from your custom ContentTypes.

Besides the properties, the ```ContentType``` schemas and FieldSettings will be converted to TypeScript classes too. This way building and validating forms will be super easy on the client-side as 
well.

The biggest part of the new API will be an Action framework. Most of the Sense/Net ```Actions``` could be called trough OData before but from now on you don't have to create all the ajax requests, 
promises or error handlers. Our new solution will help you using, completing or even overriding an Action's functionality, so that you can manipulate data in the Content Repository easily.

## Used technologies and libraries so far

Keep in mind that SN7 is a continuously developing and improving software, and because of it is in prealpha state now, nothing is set in stone. We are trying out new technologies and libraries 
during development, some of them look promising at the start but maybe will be dropped at some point. So far the ones listed here are looking to be part of our concept but we welcome every advice 
or criticism if it helps us on our journey. Feel free to create an issue on [Github](https://github.com/SenseNet/sn-client-js) or contact us in Gitter chat (at the bottom right corner) and share 
your thoughts.

[SN7+](https://github.com/sensenetecm)

[Typescript 2.0+](https://github.com/Microsoft/TypeScript/releases)

[redux 3.5.2+](https://github.com/reactjs/redux)

[redux-thunk 2.1.0+](https://github.com/gaearon/redux-thunk)

[RxJS 5.0.0+](http://reactivex.io/rxjs/)

## Quick Examples

### Creating a Folder with the name 'Hello world'

```ts
let content = new SenseNet.ContentTypes.Folder({ DisplayName: 'Hello world!' });
```

or

```ts
let content = SenseNet.Content.Create('Folder', { DisplayName: 'Hello world!' });
```

### Load a Content by its id
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

### Get the Schema of the given ContentType
```javascript
let schema = SenseNet.Content.GetSchema('GenericContent');
```

### Read Collection data
```ts
let collection = new Collection([]);
var options = new ODataHelper.ODataOptions({ 
	select: ["DisplayName", "Lead"], 
	orderby: 'DisplayName', 
	metadata: 'no' });

let fetchContent = Collection.Read('/NewsDemo/External', options); //gets the list of  the external Articles with their Id, Type and DisplayName fields.
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

### Delete a Content from a Collection
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
