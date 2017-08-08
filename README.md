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
[![Greenkeeper badge](https://badges.greenkeeper.io/SenseNet/sn-client-js.svg)](https://greenkeeper.io/)

This component lets you work with the [sensenet ECM](https://github.com/SenseNet) Content Repository (create or manage content, execute queries, etc.) by providing a JavaScript client API for the main content operations.
The library connects to a sensenet ECM portal's REST API, but hides the underlying HTTP requests. You can work with simple load or create Content operations in JavaScript, instead of
having to construct ajax requests yourself.

It also provides you the full sensenet Content Type system hierarchy through Typescript classes with all the fields defined in the CTDs and the Content Type schemas with FieldSettings
so that you can manage Content easy on client-side knowing the related fields and their settings.

> Tested with the following Sense/Net Services version: 
> 
> [![Sense/Net Services](https://img.shields.io/badge/sensenet-7.0.0--beta%20tested-green.svg)](https://github.com/SenseNet/sensenet/releases/tag/v7.0.0-beta3)

## Installation with node and npm

To install the latest stable version run

```
npm install --save sn-client-js
```

## Usage

### Creating a Repository instance
Your main entry point in this library is the Repository object. You can create an Instance by the following way:

```ts
import { Repository } from 'sn-client-js';

let repository = new Repository.SnRepository({
            RepositoryUrl: 'https://my-sensenet-site.com',
            ODataToken: 'OData.svc',
            JwtTokenKeyTemplate: 'my-${tokenName}-token-for-${siteName}',
            JwtTokenPersist: 'expiration'
        });
```
 - __RepositoryURL__: The component will communicate with your repositoy using the following url. This will fall back to your _window.location.href_, if not specified. To enable your external app to send request against your sensenet portal change your ```Portal.settings```. For further information about cross-origin resource sharing in sensenet check [this](community.sensenet.com/docs/cors/)
article.
 - __ODataToken__: Check your Sense/Net portal's web.config and if the ```ODataServiceToken``` is set, you can configure it here for the client side.
 - __JwtTokenKeyTemplate__ - This will be the template how your JWT tokens will be stored (in _local/session storage_ or as a _cookie_). _${tokenName}_ will be replaced with the token's name ('access' or 'refresh'), _${siteName}_ will be replaced with your site's name
 - __JwtTokenPersist__ - You can change how JWT Tokens should be persisted on the client, you can use _'session'_, whitch means the token will be invalidated on browser close, or _'expiration'_, in that case the token expiration property will be used (See [JWT Token docs](http://community.sensenet.com/docs/web-token-authentication/) for further details)

### Create, Save, Update

You can create a new *content* instance in the following way:
```ts
import { ContentTypes } from 'sn-client-js';

let myTask = repository.CreateContent({
		Name: 'MyTask',
		Path: '/Root/MyWorkspace/MyTaskList'
	},
	ContentTypes.Task);
```
The content is not posted to the Reposiory yet, but you can *bind* it to a Create content form and update it's values like this:
```ts
myTask.DueDate = "2017-09-12T12:00:00Z";
```
You can always check if a specified content has been saved or not with the  ```content.IsSaved ``` property.

If you've finished with the editing, you can Save it the following way:
```ts
myTask.Save().subscribe(task=>{
	console.log('Task saved', task);
}, error => console.error);
```
Once the Task has been saved, you can continue working *on the same object reference*, update fields and call ```myTask.Save()``` again, the content will be **updated** in the sensenet ECM Repository.

If you want to update **a specified field only**, you can do that with an optional Save() parameter (other changed properties will be ignored):
```ts
myTask.Save({DisplayName: 'Updated Task Displayname'}).subscribe(task=>{
	console.log('Task saved', task);
}, error => console.error)
```

### Load, Reload
You can load a content instance from the repository by the following way:

```ts
//by Path
repository.Load('Root/MyWorkspace/MyTaskList/MyTask1').subscribe(loadedTask=>{
	console.log('Task loaded', loadedTask);
}, error => console.error);

//or by Id
let myTaskId = 12345
repository.Load(myTaskId).subscribe(loadedTask=>{
	console.log('Task loaded', loadedTask);
}, error => console.error);

//you can also specify which fields you want to load or expand
repository.Load(myTaskId, {
	select: ['Name', 'DisplayName'],
	expand: 'Owner'
}).subscribe(loadedTask => {
	console.log('Task loaded', loadedTask);
}, error => console.error);
```
> If you *load* or *reload* the same content from the same repository, you will get the same *object reference*

If you use Schema definition and you need to *reload* a content for a specified action (can be 'view' or 'edit' for now) you can do that with:
```ts
myTask.Reload('view').subscribe(reloadedTask=>{
	console.log('Task reloaded', reloadedTask);
}, error => console.error)
```
If you want to reload only specific *fields* or *references*, you can do that in the following way:
```ts
myTask.ReloadFields('Owner', 'Name', 'ModifiedBy').subscribe(reloadedTask=>{
	console.log('Fields loaded', reloadedTask);
}, error => console.error)
```

### Reference fields

You can query reference fields like the following:
```ts
myTask.CreatedBy.GetContent().subscribe(createdBy => {
	console.log('Task is created by', createdBy);
});
```
> Reference fields are loaded lazily. This means that if their value isn't loaded yet, it will make an additional HTTP request. If you know exactly what reference fields will be used, call *content.Reload('view' | 'edit')* or content.ReloadFields(...fields) to speed things up.


### Delete
If you want to delete a content *permanently* (or just move it to the Trash folder), you can simply call:
```ts
let permanently = false;
myTask.Delete(permanently).subscribe(()=>{
	console.log('Moved to trash.');
}, err=> console.error);
```

### Tracking changes
There are several methods to track the state of content instances
 - **content.IsSaved** - Shows if the content is just created or is saved to the *Repository*
 - **content.IsDirty** - Indicates if some of its fields has changed
 - **content.IsValid** - Indicates if all complusory fields has been filled
 - **content.SavedFields** - Returns an object with the last saved fields
 - **content.GetChanges()** - Returns an object with the changed fields and their new values
 > If the *content* is partially loaded, only their *loaded* fields or references will be tracked.

### Hierarchical content comparison
As sensenet ECM stores content in a tree-based repository, there are some methods for hierarchical comparison between content. These methods are:
 - content.IsParentOf(childContent: Content): boolean
 - content.IsChildOf(parentContent: Content): boolean
 - content.IsAncestorOf(descendantContent: Content): boolean
 - content.IsDescendantOf(ancestorContent: Content): boolean

### Repository events
There are some Event *Observables* on the **Repository** level which you can subscribe for tracking changes. You can find them on the **repository.Events** namespace. They are:
 - OnContentCreated
 - OnContentCreateFailed
 - OnContentModified
 - OnContentModificationFailed
 - OnContentLoaded
 - OnContentDeleted
 - OnContentDeleteFailed
 - OnContentMoved
 - OnContentMoveFailed
 - OnCustomActionExecuted
 - OnCustomActionFailed


### Content Queries
You can run queries from a *repository instance* or from a *content instance*. There is a fluent API for creating type safe and valid *Content Queries*
```ts
const query = repository.CreateQuery(q => 
	q.TypeIs(ContentTypes.Folder)
		.And
		.Equals('DisplayName', 'a*')
		.Top(10));

query.Exec()
	.subscribe(res => {
    	console.log('Folders count: ', res.Count);
    	console.log('Folders: ', res.Result);
} 
```

### Get the Schema of the given ContentType

```ts
let schema = Content.GetSchema(ContentTypes.GenericContent);
```

### Read Collection data
 
```ts

import { Collection } from 'sn-client-js';

let collection = new Collection([], repository, ContentTypes.Task);

let fetchContent = collection.Read('/NewsDemo/External', { select: 'all' }); //gets the list of  the external Articles with their Id, Type and DisplayName fields.
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

## Building sn-client-js from source
 1. Clone the repository: ```git clone https://github.com/SenseNet/sn-client-js.git```
 2. Go to the sn-client-js directory: ```cd sn-client-js ```
 3. Install dependencies: ```npm install```
 4. Build the project: ```npm run build```
To run the linter and building the project, use:

```
npm run build
```

## Running the unit tests

To execute all unit tests and generate the coverage report, run: ```npm run test```

## Related documents
* [sn-client-js API reference](http://www.sensenet.com/documentation/sn-client-js/index.html)
* [sn-redux API reference](http://www.sensenet.com/documentation/sn-redux/index.html)
* [Todo App with React, Redux and Sense/Net ECM](https://github.com/SenseNet/sn-react-redux-todo-app)
* [Todo App with Angular, Redux and Sense/Net ECM](https://github.com/blaskodaniel/sn-angular-redux-todo-app)
* [Todo App with Angular2, Redux and Sense/Net ECM](https://github.com/SenseNet/sn-angular2-redux-todo-app)
* [Todo App with Aurelia, Redux and Sense/Net ECM](https://github.com/B3zo0/sn7-aurelia-redux-todo-app)
* [Todo App with Vue, Redux and Sense/Net ECM](https://github.com/SenseNet/sn-vue-redux-todo-app)
