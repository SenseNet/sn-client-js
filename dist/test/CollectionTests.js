"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Content_1 = require("../src/Content");
const Collection_1 = require("../src/Collection");
const rxjs_1 = require("@reactivex/rxjs");
const Chai = require("chai");
const Repository_1 = require("../src/Repository");
const Http_1 = require("../src/Http");
const expect = Chai.expect;
describe('Collection', () => {
    let collection;
    let children;
    let Repo = new Repository_1.Repository(Http_1.Http.RxPromiseHttpProvder);
    let window = {};
    beforeEach(function () {
        children = [
            Content_1.Content.Create(Content_1.Content, {
                Id: 1,
                Name: 'test1',
                Path: '/'
            }, this.repo),
            Content_1.Content.Create(Content_1.Content, {
                Id: 2,
                Name: 'test2'
            }, this.repo)
        ];
        collection = new Collection_1.Collection(children, Repo.OData);
        collection.Path = 'https://daily.demo.sensenet.com/lorem';
        window['serviceToken'] = 'OData.svc';
        window['siteUrl'] = 'https://daily.demo.sensenet.com';
    });
    describe('#Items()', () => {
        it('should return an array', function () {
            const items = collection.Items();
            expect(items).to.be.instanceof(Array);
        });
        it('should return an array with the same children objects', function () {
            const items = collection.Items();
            expect(items).to.deep.members(children);
        });
    });
    describe('#Item(id)', () => {
        it('should return an object with a given id', function () {
            const item = collection.Item(1);
            expect(item).to.be.instanceof(Content_1.Content);
            expect(item.Id).to.be.eq(1);
        });
    });
    describe('#Count()', () => {
        it('should return the number of items, in this case 2', function () {
            const count = collection.Count();
            expect(count).to.be.eq(2);
        });
    });
    describe('#Add()', () => {
    });
    describe('#Remove()', () => {
        it('should return an observable', function () {
            expect(collection.Remove(1, true)).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Remove()', () => {
        it('should return an observable', function () {
            expect(collection.Remove(1)).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Remove()', () => {
        it('should return an observable', function () {
            collection['Path'] = '/workspaces/project';
            expect(collection.Remove([0, 1], true)).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Remove()', () => {
        it('should return an observable', function () {
            collection['Path'] = '/workspaces/project';
            expect(collection.Remove([0, 1])).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Move()', () => {
        it('should return an observable', function () {
            expect(collection.Move(1, '/workspaces/Project')).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Move()', () => {
        it('should return an observable', function () {
            collection['Path'] = '/workspaces/project';
            expect(collection.Move([0, 1], '/workspaces/Project')).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Copy()', () => {
        it('should return an observable', function () {
            expect(collection.Copy(1, '/workspaces/Project')).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#Copy()', () => {
        it('should return an observable', function () {
            collection['Path'] = '/workspaces/project';
            expect(collection.Copy([0, 1], '/workspaces/Project')).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#AllowedChildTypes()', () => {
        it('should return an observable', function () {
            collection['Path'] = '/workspaces/project';
            expect(collection.AllowedChildTypes()).to.be.instanceof(rxjs_1.Observable);
        });
    });
    describe('#AllowedChildTypes()', () => {
        it('should return an observable', function () {
            collection['Path'] = '/workspaces/project';
            expect(collection.AllowedChildTypes({ select: 'Name' })).to.be.instanceof(rxjs_1.Observable);
        });
    });
});
//# sourceMappingURL=CollectionTests.js.map