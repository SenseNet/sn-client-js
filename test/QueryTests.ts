import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { Query } from '../src/Query';
import { ContentTypes } from '../src/SN';
import { MockRepository } from './Mocks/index';
import { LoginState } from '../src/Authentication/LoginState';

const expect = Chai.expect;

@suite('ContentSerializer')
export class QueryTests {
    @test
    public 'Can be constructed'() {
        const q = Query.Create(q => q);
        expect(q).to.be.instanceof(Query);
    }

    @test
    public 'Can be from a repository'(done: MochaDone) {
        const repo = new MockRepository()
        repo.Authentication.stateSubject.next(LoginState.Authenticated);
        repo.httpProviderRef.setResponse({
            d: {
                __count: 1,
                results: [{
                    Id: 1,
                    Name: 'Test',
                    Type: 'Folder',
                    Path: 'Root/Tasks'
                }]
            }
        })
        repo.RunQuery(q => q.TypeIs(ContentTypes.Folder)).subscribe(res => {
            expect(res.Count).to.be.eq(1);
            expect(res.Result[0]).to.be.instanceof(ContentTypes.Folder);
            expect(res.Result[0].Type).to.be.eq('Folder');

            const query: string = (repo.httpProviderRef.lastOptions.url as any)
                .split('?')
                .find(a => a.indexOf('query') >= 0)
                .split('&')
                .find(a => a.indexOf('query') >= 0)

            expect(query).to.be.eq('query=+TypeIs:Folder');
            done();
        }, done);
    }

    @test
    public 'Should throw Error when try to run from a Content without Path'() {
        const repo = new MockRepository()
        
        const content = repo.HandleLoadedContent({
            Id: 3,
            Type: 'Folder'
        })

        expect(() => content.RunQuery(q => q.TypeIs(ContentTypes.Folder))).to.throw('No Content path provided for querying');
    }

    @test
    public 'Can be from a Content'(done: MochaDone) {
        const repo = new MockRepository()
        repo.Authentication.stateSubject.next(LoginState.Authenticated);
        repo.httpProviderRef.setResponse({
            d: {
                __count: 1,
                results: [{
                    Id: 1,
                    Name: 'Test',
                    Type: 'Folder',
                    Path: 'Root/Folders'
                }]
            }
        })

        const content = repo.HandleLoadedContent({
            Id: 3,
            Path: 'Root/Content/Folders',
            Type: 'Folder'
        })

        content.RunQuery(q => q.TypeIs(ContentTypes.Folder)).subscribe(res => {
            expect(res.Count).to.be.eq(1);
            expect(res.Result[0]).to.be.instanceof(ContentTypes.Folder);
            expect(res.Result[0].Type).to.be.eq('Folder');

            const query: string = (repo.httpProviderRef.lastOptions.url as any)
                .split('?')
                .find(a => a.indexOf('query') >= 0)
                .split('&')
                .find(a => a.indexOf('query') >= 0)

            expect(query).to.be.eq('query=+TypeIs:Folder');
            done();
        }, done);
    }

    @test
    public 'Term syntax'() {
        const queryInstance = Query.Create(q => q.Term('test term'));
        expect(queryInstance.toString()).to.be.eq('test term')
    }    

    @test
    public 'TypeIs syntax'() {
        const queryInstance = Query.Create(q => q.TypeIs<ContentTypes.Task>(ContentTypes.Task));
        expect(queryInstance.toString()).to.be.eq('+TypeIs:Task');
    }

    @test
    public 'Type syntax'() {
        const queryInstance = Query.Create(q => q.Type<ContentTypes.Task>(ContentTypes.Task));
        expect(queryInstance.toString()).to.be.eq('+Type:Task');
    }

    @test
    public 'InFolder with Path'() {
        const queryInstance = Query.Create(q => q.InFolder('a/b/c'));
        expect(queryInstance.toString()).to.be.eq('+InFolder:"a/b/c"')
    }

    @test
    public 'InFolder with Content'() {
        const repo = new MockRepository();
        const content = repo.CreateContent({ Id: 2, Path: 'a/b/c', Name: 'test', Type: 'Task' }, ContentTypes.Task);
        const queryInstance = Query.Create(q => q.InFolder(content));
        expect(queryInstance.toString()).to.be.eq('+InFolder:"a/b/c"')
    }

    @test
    public 'InTree with Path'() {
        const queryInstance = Query.Create(q => q.InTree('a/b/c'));
        expect(queryInstance.toString()).to.be.eq('+InTree:"a/b/c"')
    }

    @test
    public 'InTree with Content'() {
        const repo = new MockRepository();
        const content = repo.CreateContent({ Id: 2, Path: 'a/b/c', Name: 'test', Type: 'Task' }, ContentTypes.Task);
        const queryInstance = Query.Create(q => q.InTree(content));
        expect(queryInstance.toString()).to.be.eq('+InTree:"a/b/c"')
    }

    @test
    public 'Equals'() {
        const queryInstance = Query.Create(q => q.Equals('DisplayName', 'test'));
        expect(queryInstance.toString()).to.be.eq('+DisplayName:\'test\'')
    }

    @test
    public 'NotEquals'() {
        const queryInstance = Query.Create(q => q.NotEquals('DisplayName', 'test'));
        expect(queryInstance.toString()).to.be.eq('+NOT(DisplayName:\'test\')')
    }

    @test
    public 'Between exclusive'() {
        const queryInstance = Query.Create(q => q.Between('Index', 1, 5));
        expect(queryInstance.toString()).to.be.eq('+Index:{\'1\' TO \'5\'}')
    }

    @test
    public 'Between Inclusive'() {
        const queryInstance = Query.Create(q => q.Between('Index', 10, 50, true, true));
        expect(queryInstance.toString()).to.be.eq('+Index:[\'10\' TO \'50\']')
    }

    @test
    public 'GreatherThan Exclusive'() {
        const queryInstance = Query.Create(q => q.GreatherThan('Index', 10));
        expect(queryInstance.toString()).to.be.eq('+Index:>\'10\'')
    }


    @test
    public 'GreatherThan Inclusive'() {
        const queryInstance = Query.Create(q => q.GreatherThan('Index', 10, true));
        expect(queryInstance.toString()).to.be.eq('+Index:>=\'10\'')
    }

    @test
    public 'LessThan Exclusive'() {
        const queryInstance = Query.Create(q => q.LessThan('Index', 10));
        expect(queryInstance.toString()).to.be.eq('+Index:<\'10\'')
    }


    @test
    public 'LessThan Inclusive'() {
        const queryInstance = Query.Create(q => q.LessThan('Index', 10, true));
        expect(queryInstance.toString()).to.be.eq('+Index:<=\'10\'')
    }

    @test
    public 'AND syntax'(){
        const queryInstance = Query.Create(q => q.Equals('Index', 1).And.Equals('DisplayName', 'Test'));
        expect(queryInstance.toString()).to.be.eq("+Index:'1' AND +DisplayName:'Test'")
    }

    @test
    public 'OR syntax'(){
        const queryInstance = Query.Create(q => q.Equals('Index', 1).Or.Equals('DisplayName', 'Test'));
        expect(queryInstance.toString()).to.be.eq("+Index:'1' OR +DisplayName:'Test'")
    }

    @test
    public 'inner Query'() {
        const queryInstance = Query.Create(q => q.Equals('DisplayName', 'Test')
            .And
            .Query(inner =>
                inner.Equals('Index', 1)
            )
        )
        expect(queryInstance.toString()).to.be.eq("+DisplayName:'Test' AND (+Index:'1')");
    }

    @test
    public 'NOT statement'() {
        const queryInstance = Query.Create(q => q.Equals('DisplayName', 'Test')
            .And
            .Not(inner =>
                inner.Equals('Index', 1)
            )
        )
        expect(queryInstance.toString()).to.be.eq("+DisplayName:'Test' AND NOT(+Index:'1')");
    }

    @test
    public 'OrderBy'() {
        const queryInstance = Query.Create(q => q.Sort('DisplayName'));
        expect(queryInstance.toString()).to.be.eq(".SORT:'DisplayName'");
    }

    @test
    public 'OrderBy Reverse'() {
        const queryInstance = Query.Create(q => q.Sort('DisplayName', true));
        expect(queryInstance.toString()).to.be.eq(".REVERSESORT:'DisplayName'");
    }


    @test
    public 'Top'() {
        const queryInstance = Query.Create(q => q.Top(50));
        expect(queryInstance.toString()).to.be.eq('.TOP:50');
    }

    @test
    public 'Skip'() {
        const queryInstance = Query.Create(q => q.Skip(10));
        expect(queryInstance.toString()).to.be.eq('.SKIP:10');
    }

}