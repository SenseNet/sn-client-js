# sn-client-js

[![Gitter chat](https://img.shields.io/gitter/room/SenseNet/SN7ClientAPI.svg?style=flat)](https://gitter.im/SenseNet/SN7ClientAPI)
[![Build status](https://img.shields.io/travis/SenseNet/sn-client-js.svg?style=flat)](https://travis-ci.org/SenseNet/sn-client-js)
[![Coverage](https://img.shields.io/codecov/c/github/SenseNet/sn-client-js.svg?style=flat)](https://codecov.io/gh/SenseNet/sn-client-js)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b09d599538fa49e9bb1cb92df4042ada)](https://www.codacy.com/app/herflis33/sn-client-js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SenseNet/sn-client-js&amp;utm_campaign=Badge_Grade)
[![NPM version](https://img.shields.io/npm/v/sn-client-js.svg?style=flat)](https://www.npmjs.com/package/sn-client-js)
[![NPM downloads](https://img.shields.io/npm/dt/sn-client-js.svg?style=flat)](https://www.npmjs.com/package/sn-client-js)
[![License](https://img.shields.io/github/license/SenseNet/sn-client-js.svg?style=flat)](https://github.com/SenseNet/sn-client-js/LICENSE.txt)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat)](http://commitizen.github.io/cz-cli/)

This component lets you work with the [sensenet ECM](https://github.com/SenseNet) Content Repository (create or manage content, execute queries, etc.) by providing a JavaScript client API for the main content 
operations.

This library connects to a SenseNet portal's REST API, but hides the underlying HTTP requests. You can work with simple load or create Content operations in JavaScript, instead of
having to construct ajax requests yourself.

It also provides you the full SenseNet Content Type system hierarchy through Typescript classes with all the fields defined in the CTDs and the Content Type schemas with FieldSettings
so that you can manage Content easy on client-side knowing the related fields and their settings.

> Tested with the following Sense/Net Services version: 
> 
> [![Sense/Net Services](https://img.shields.io/badge/sensenet-7.0.0--beta%20tested-green.svg)](https://github.com/SenseNet/sensenet/releases/tag/v7.0.0-beta)

### Installation on an existing Sense/Net portal

Get the latest stable version with npm

```
npm install --save sn-client-js
```

or from the [GitHub repository](https://github.com/SenseNet/sn-client-js), build and place the downloaded and builded source into your project. If you want to use only the transpiled JavaScript modules, you can find them in the dist/src folder and import them like

```ts
var SN = require('/pathtomodule/sn-client-js');
```

If you want to use the module types you can find them in the src folder. Import them the following way:

```ts
import { Repository, ContentTypes } as SN from 'sn-client-js';

let repository = new Repository.SnRepository();

this.Repository.Contents.Create('Root/', { 
	Name: 'myFolder',
}, ContentTypes.Folder);

```

### Installation into an external app with node and npm

To install the latest stable version

```
npm install --save sn-client-js
```

You can specify additional options when creating an SnRepository instance by the following way:

```ts
import { Repository, Config } as SN from 'sn-client-js';

let repository = new Repository.SnRepository({
            RepositoryUrl: 'https://my-sensenet-site.com',
            ODataToken: 'OData.svc',
            JwtTokenKeyTemplate: 'my-${tokenName}-token-for-${siteName}',
            JwtTokenPersist: 'expiration'
        });
```
 - __RepositoryURL__: The component will communicate with your repositoy using the following url. This will fall back to your _window.location.href_, if not specified. To enable your external app to send request against your sensenet portal change your ```Portal.settings```. For further information about cross-origin resource sharing in sensenet check [this](http://wiki.sensenet.com/Cross-origin_resource_sharing#Origin_check)
article.
 - __ODataToken__: Check your Sense/Net portal's web.config and if the ```ODataServiceToken``` is set, you can configure it here for the client side.
 - __JwtTokenKeyTemplate__ - This will be the template how your JWT tokens will be stored (in _local/session storage_ or as a _cookie_). _${tokenName}_ will be replaced with the token's name ('access' or 'refresh'), _${siteName}_ will be replaced with your site's name
 - __JwtTokenPersist__ - You can change how JWT Tokens should be persisted on the client, you can use _'session'_, whitch means the token will be invalidated on browser close, or _'expiration'_, in that case the token expiration property will be used (See [JWT Token docs](http://community.sensenet.com/docs/web-token-authentication/) for further details)



### Import

#### CommonJS

```js
var SN = require('sn-client-js');

let myRepository = new SN.Repository.SnRepository();

myRepository.Contents.Create('Root/Path', {
	Name: 'MyFolderName',
}, SN.ContentTypes.Folder);

```

### Typescript

```ts
import { Repository, ContentTypes } as SN from 'sn-client-js';

let repository = new Repository.SnRepository();
myRepository.Contents.Create('Root/Path', {
	Name: 'MyFolderName'
}, ContentTypes.Folder)

```

### Building sn-client-js

To run the linter and building the project, use:

```
npm run build
```

### Running tests

To execute all unit tests and generate the coverage report, run:

```
npm t
```

### Examples

##### Creating a Folder with the name 'Hello world'
 
```ts
repository.Contents.Create('Root/Path', {
	Name: 'Hello world'
}, ContentTypes.Folder)
.subscribe(newFolder=>{
		console.log('New folder created: ', newFolder)
	}, err=> {
		console.error('Error happened during creating a Folder:', err)
	});
```

or

```ts
let folder = new ContentTypes.Folder({
	Name: 'Hello world'
}, repository);

repository.Contents.Post('Root/Path', folder, ContentTypes.Folder)
.subscribe(newFolder=>{
		console.log('New folder created: ', newFolder)
	}, err=> {
		console.error('Error happened during creating a Folder:', err)
	});

```

##### Load a Content by its id
 
```ts
repository.Load(1234,{expand: 'Avatar'}, 'A.1', ContentTypes.User)
.subscribe( user=> {
		console.log('User:', user);
	}, err=>{
		console.error('Error happened during loading an user:', err)
	});
```

##### Get the Schema of the given ContentType
 
```ts
let schema = SN.Content.GetSchema('GenericContent');
```

##### Read Collection data
 
```ts
let collection = new SN.Collection([], repository.Contents);
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

### Related documents
* [sn-client-js API reference](http://www.sensenet.com/documentation/sn-client-js/index.html)
* [sn-redux API reference](http://www.sensenet.com/documentation/sn-redux/index.html)
* [Todo App with React, Redux and Sense/Net ECM](https://github.com/SenseNet/sn-react-redux-todo-app)
* [Todo App with Angular, Redux and Sense/Net ECM](https://github.com/blaskodaniel/sn-angular-redux-todo-app)
* [Todo App with Angular2, Redux and Sense/Net ECM](https://github.com/SenseNet/sn-angular2-redux-todo-app)
* [Todo App with Aurelia, Redux and Sense/Net ECM](https://github.com/B3zo0/sn7-aurelia-redux-todo-app)
* [Todo App with Vue, Redux and Sense/Net ECM](https://github.com/SenseNet/sn-vue-redux-todo-app)
