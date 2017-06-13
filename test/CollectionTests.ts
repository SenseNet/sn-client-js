import { Observable } from '@reactivex/rxjs';
import * as Chai from 'chai';
import { Collection } from '../src/Collection';
import { Content } from '../src/Content';
import { MockRepository } from './Mocks/MockRepository';
import { ContentTypes } from '../src/SN';
const expect = Chai.expect;

describe('Collection', () => {
  let collection: Collection<Content>;
  let children: Content[];

  let Repo = new MockRepository();

  beforeEach(function () {
    children = [
      Content.Create(Content, {
        Id: 1,
        Name: 'test1',
        Path: '/'
      }, this.repo),
      Content.Create(Content, {
        Id: 2,
        Name: 'test2'
      }, this.repo)];


    collection = new Collection(children, Repo.Content);
    collection.Path = 'https://daily.demo.sensenet.com/lorem';
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
      expect(item).to.be.instanceof(Content);
      if (item && item.Id) {
        expect(item.Id).to.be.eq(1);
      } else {
        throw Error('No item in collection, or item doesn\'t have an Id');
      }

    });
  });
  describe('#Count()', () => {
    it('should return the number of items, in this case 2', function () {
      const count = collection.Count();
      expect(count).to.be.eq(2);
    });
  });
  describe('#Add()', () => {
    it('should return an observable', function () {
      let content = Content.Create(ContentTypes.Task, { DueDate: new Date(), Name: '' }, new MockRepository());
      expect(collection.Add(content)).to.be.instanceof(Observable);
    });
  });
  describe('#Remove()', () => {
    it('should return an observable', function () {
      expect(collection.Remove(1, true)).to.be.instanceof(Observable);
    });
  });
  describe('#Remove()', () => {
    it('should return an observable', function () {
      expect(collection.Remove(1)).to.be.instanceof(Observable);
    });
  });
  describe('#Remove()', () => {
    it('should return an observable', function () {
      collection['Path'] = '/workspaces/project'
      expect(collection.Remove([0, 1], true)).to.be.instanceof(Observable);
    });
  });
  describe('#Remove()', () => {
    it('should return an observable', function () {
      collection['Path'] = '/workspaces/project'
      expect(collection.Remove([0, 1])).to.be.instanceof(Observable);
    });
  });
  describe('#Move()', () => {
    it('should return an observable', function () {
      expect(collection.Move(1, '/workspaces/Project')).to.be.instanceof(Observable);
    });
  });
  describe('#Move()', () => {
    it('should return an observable', function () {
      collection['Path'] = '/workspaces/project'
      expect(collection.Move([0, 1], '/workspaces/Project')).to.be.instanceof(Observable);
    });
  });
  describe('#Copy()', () => {
    it('should return an observable', function () {
      expect(collection.Copy(1, '/workspaces/Project')).to.be.instanceof(Observable);
    });
  });
  describe('#Copy()', () => {
    it('should return an observable', function () {
      collection['Path'] = '/workspaces/project'
      expect(collection.Copy([0, 1], '/workspaces/Project')).to.be.instanceof(Observable);
    });
  });
  describe('#AllowedChildTypes()', () => {
    it('should return an observable', function () {
      collection['Path'] = '/workspaces/project';
      expect(collection.AllowedChildTypes()).to.be.instanceof(Observable);
    });
  });
  describe('#AllowedChildTypes()', () => {
    it('should return an observable', function () {
      collection['Path'] = '/workspaces/project';
      expect(collection.AllowedChildTypes({ select: 'Name' })).to.be.instanceof(Observable);
    });
  });
});