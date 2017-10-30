import { Observable } from '@reactivex/rxjs';
import * as Chai from 'chai';
import { LoginState } from '../src/Authentication/LoginState';
import { Collection } from '../src/Collection';
import { Content, ContentInternal } from '../src/Content';
import { Task } from '../src/ContentTypes';
import { MockRepository } from './Mocks/MockRepository';
const expect = Chai.expect;

export const CollectionTests = describe('Collection', () => {
  let collection: Collection<Task>;
  let children: Content[];

  let Repo: MockRepository;

  beforeEach(() => {
    Repo = new MockRepository();
    children = [
      Repo.HandleLoadedContent({
        Id: 1,
        Name: 'test1',
        Path: '/'
      }),
      Repo.HandleLoadedContent({
        Id: 2,
        Path: 'Root/Test',
        Name: 'test2'
      })];

    collection = new Collection(children, Repo, Task);
    collection.Path = 'https://daily.demo.sensenet.com/lorem';
  });
  describe('#Items()', () => {
    it('should return an array', () => {
      const items = collection.Items();
      expect(items).to.be.instanceof(Array);
    });
    it('should return an array with the same children objects', () => {
      const items = collection.Items();
      expect(items).to.deep.members(children);
    });
  });
  describe('#Item(id)', () => {
    it('should return an object with a given id', () => {
      const item = collection.Item(1);
      expect(item).to.be.instanceof(ContentInternal);
      if (item && item.Id) {
        expect(item.Id).to.be.eq(1);
      } else {
        throw Error('No item in collection, or item doesn\'t have an Id');
      }

    });
  });
  describe('#Count()', () => {
    it('should return the number of items, in this case 2', () => {
      const count = collection.Count();
      expect(count).to.be.eq(2);
    });
  });
  describe('#Add()', () => {
    it('should return an observable', () => {
      const content = ContentInternal.Create({ DueDate: '2017-06-27T11:11:11Z', Name: '' }, Task, Repo);
      expect(collection.Add(content)).to.be.instanceof(Observable);
    });

    it('Observable should be resolved', (done) => {
      const content = Repo.HandleLoadedContent({ DueDate: '2017-06-27T11:11:11Z', Name: '', Id: 231876, Path: 'Root/Test' });
      Repo.Authentication.StateSubject.next(LoginState.Authenticated);
      Repo.HttpProviderRef.AddResponse({ d: content.GetFields() });
      collection.Add(content).subscribe((r) => {
        done();
      }, done);
    });

  });
  describe('#Remove()', () => {
    it('should return an observable', () => {
      expect(collection.Remove(1, true)).to.be.instanceof(Observable);
    });
  });
  describe('#Remove()', () => {
    it('should return an observable', () => {
      expect(collection.Remove(1)).to.be.instanceof(Observable);
    });
  });
  describe('#Remove()', () => {
    it('should return an observable', () => {
      collection.Path = '/workspaces/project';
      expect(collection.Remove([0, 1], true)).to.be.instanceof(Observable);
    });
  });
  describe('#Remove()', () => {
    it('should return an observable', () => {
      collection.Path = '/workspaces/project';
      expect(collection.Remove([0, 1])).to.be.instanceof(Observable);
    });
  });
  describe('#Move()', () => {
    it('should return an observable', () => {
      expect(collection.Move(1, '/workspaces/Project')).to.be.instanceof(Observable);
    });
  });
  describe('#Move()', () => {
    it('should return an observable', () => {
      collection.Path = '/workspaces/project';
      expect(collection.Move([0, 1], '/workspaces/Project')).to.be.instanceof(Observable);
    });
  });
  describe('#Copy()', () => {
    it('should return an observable', () => {
      expect(collection.Copy(1, '/workspaces/Project')).to.be.instanceof(Observable);
    });
  });
  describe('#Copy()', () => {
    it('should return an observable', () => {
      collection.Path = '/workspaces/project';
      expect(collection.Copy([0, 1], '/workspaces/Project')).to.be.instanceof(Observable);
    });
  });
  describe('#AllowedChildTypes()', () => {
    it('should return an observable', () => {
      collection.Path = '/workspaces/project';
      expect(collection.AllowedChildTypes()).to.be.instanceof(Observable);
    });
  });
  describe('#AllowedChildTypes()', () => {
    it('should return an observable', () => {
      collection.Path = '/workspaces/project';
      expect(collection.AllowedChildTypes({ select: 'Name' })).to.be.instanceof(Observable);
    });
  });
  describe('#Upload()', () => {
    it('should return an observable', () => {
      collection.Path = '/workspaces/project';
      expect(collection.Upload('Task', 'task.docx')).to.be.instanceof(Observable);
    });
  });
  describe('#Read()', () => {
    it('should return an observable', () => {
      collection.Path = '/workspaces/project';
      expect(collection.Read('Task')).to.be.instanceof(Observable);
    });

    it('should update from Result', (done) => {
      collection.Path = '/workspaces/project';
      Repo.Authentication.StateSubject.next(LoginState.Authenticated);
      Repo.HttpProviderRef.AddResponse({
        d: {
            __count: 1,
            results: [{
                Name: 'NewUser2',
                Id: 1000,
                LoginName: 'NewUser2',
                Type: 'User',
            }]
        }
    });
      collection.Read('Task').subscribe((result) => {
        expect(result.length).to.be.eq(1);
        done();
      }, done);
    });
  });
});
