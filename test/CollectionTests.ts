///<reference path="../node_modules/@types/mocha/index.d.ts"/>
import { Content } from '../src/Content'
import { Collection } from '../src/Collection'
import * as Chai from 'chai';
const expect = Chai.expect;

describe('Collection', () => {
  let collection,
    children;
  beforeEach(function () {
    children = [{ Id: 1, }, { Id: 2, }];
    collection = new Collection(children);
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
    const content = Content.Create('Article', { DisplayName: 'content' });
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
      collection['Path'] = '/workspaces/project'
      expect(typeof collection.Remove([0, 1], true)).to.be.eq('object');
    });
  });
  describe('#Move()', () => {
    it("should return an observable", function () {
      expect(typeof collection.Move(1, '/workspaces/Project')).to.be.eq('object');
    });
  });
  describe('#Move()', () => {
    it("should return an observable", function () {
      collection['Path'] = '/workspaces/project'
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
      collection['Path'] = '/workspaces/project'
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
  describe('#Upload()', () => {
    it("should return an observable", function () {
      collection['Path'] = '/workspaces/project';
      expect(typeof collection.Upload('File', 'filename', 'overwrite', true, 'Binary')).to.be.eq('object');
    });
  });
  describe('#Upload()', () => {
    it("should return an observable", function () {
      collection['Path'] = '/workspaces/project';
      expect(typeof collection.Upload('File', 'filename', 'overwrite', true, 'Binary', 'test')).to.be.eq('object');
    });
  });
});