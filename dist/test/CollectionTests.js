"use strict";
const Content_1 = require('../src/Content');
const Collection_1 = require('../src/Collection');
const Chai = require('chai');
const expect = Chai.expect;
describe('Collection', () => {
    let collection, children;
    let window = {};
    beforeEach(function () {
        children = [{ Id: 1, }, { Id: 2, }];
        collection = new Collection_1.Collection(children);
        collection.Path = 'https://daily.demo.sensenet.com/lorem';
        window['serviceToken'] = 'OData.svc';
        window['siteUrl'] = "https://daily.demo.sensenet.com";
    });
    describe('#Items()', () => {
        it('should return an array', function () {
            const items = collection.Items();
            expect(typeof items).to.eq('object');
        });
        it('should return an array with the same children objects', function () {
            const items = collection.Items();
            expect(items).to.deep.members(children);
        });
    });
    describe('#Item(id)', () => {
        it('should return an object with a given id', function () {
            const item = collection.Item(1);
            expect(typeof item).to.be.eq('object');
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
        const content = Content_1.Content.Create('Article', { DisplayName: 'content' });
        it("should return an observable", function () {
            expect(typeof collection.Add(content)).to.be.eq('object');
        });
    });
    describe('#Remove()', () => {
        it("should return an observable", function () {
            expect(typeof collection.Remove(1, true)).to.be.eq('object');
        });
    });
    describe('#Remove()', () => {
        it("should return an observable", function () {
            expect(typeof collection.Remove(1)).to.be.eq('object');
        });
    });
    describe('#Remove()', () => {
        it("should return an observable", function () {
            collection['Path'] = '/workspaces/project';
            expect(typeof collection.Remove([0, 1], true)).to.be.eq('object');
        });
    });
    describe('#Remove()', () => {
        it("should return an observable", function () {
            collection['Path'] = '/workspaces/project';
            expect(typeof collection.Remove([0, 1])).to.be.eq('object');
        });
    });
    describe('#Move()', () => {
        it("should return an observable", function () {
            expect(typeof collection.Move(1, '/workspaces/Project')).to.be.eq('object');
        });
    });
    describe('#Move()', () => {
        it("should return an observable", function () {
            collection['Path'] = '/workspaces/project';
            expect(typeof collection.Move([0, 1], '/workspaces/Project')).to.be.eq('object');
        });
    });
    describe('#Copy()', () => {
        it("should return an observable", function () {
            expect(typeof collection.Copy(1, '/workspaces/Project')).to.be.eq('object');
        });
    });
    describe('#Copy()', () => {
        it("should return an observable", function () {
            collection['Path'] = '/workspaces/project';
            expect(typeof collection.Copy([0, 1], '/workspaces/Project')).to.be.eq('object');
        });
    });
    describe('#AllowedChildTypes()', () => {
        it("should return an observable", function () {
            collection['Path'] = '/workspaces/project';
            expect(typeof collection.AllowedChildTypes()).to.be.eq('object');
        });
    });
    describe('#AllowedChildTypes()', () => {
        it("should return an observable", function () {
            collection['Path'] = '/workspaces/project';
            expect(typeof collection.AllowedChildTypes({ select: 'Name' })).to.be.eq('object');
        });
    });
});

//# sourceMappingURL=CollectionTests.js.map
