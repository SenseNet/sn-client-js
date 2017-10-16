import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { Query } from '../src/Query';
import { ContentTypes } from '../src/SN';
import { MockRepository } from './Mocks/index';
import { LoginState } from '../src/Authentication/LoginState';

const expect = Chai.expect;

@suite('Query tests')
export class QueryTests {
    @test
    public 'Can be constructed'() {
        const q = new Query(q => q);
        expect(q).to.be.instanceof(Query);
    }

    @test
    public 'Can be from a repository'(done: MochaDone) {
        const repo = new MockRepository()
        repo.Authentication.stateSubject.next(LoginState.Authenticated);
        repo.httpProviderRef.AddResponse({
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
        const query = repo.CreateQuery(q => q.TypeIs(ContentTypes.Folder));
            query.Exec()
            .subscribe(res => {
                expect(res.Count).to.be.eq(1);
                expect(res.Result[0]).to.be.instanceof(ContentTypes.Folder);
                expect(res.Result[0].Type).to.be.eq('Folder');
                done();
            }, done);

            expect(query.toString()).to.be.eq('TypeIs:Folder');
    }

    @test
    public 'Should throw Error when try to run from a Content without Path'() {
        const repo = new MockRepository()

        const content = repo.HandleLoadedContent({
            Id: 3,
            Type: 'Folder',
        } as any)

        expect(() => content.CreateQuery(q => q.TypeIs(ContentTypes.Folder))).to.throw('No Content path provided for querying');
    }

    @test
    public 'Can be from a Content'(done: MochaDone) {
        const repo = new MockRepository()
        repo.Authentication.stateSubject.next(LoginState.Authenticated);
        repo.httpProviderRef.AddResponse({
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

        const query = content.CreateQuery(q => q.TypeIs(ContentTypes.Folder))
        query.Exec().subscribe(res => {
            expect(res.Count).to.be.eq(1);
            expect(res.Result[0]).to.be.instanceof(ContentTypes.Folder);
            expect(res.Result[0].Type).to.be.eq('Folder');
            done();
        }, done);

        expect(query.toString()).to.be.eq('TypeIs:Folder');


    }

    @test
    public 'Term syntax'() {
        const queryInstance = new Query(q => q.Term('test term'));
        expect(queryInstance.toString()).to.be.eq('test term')
    }

    @test
    public 'TypeIs syntax'() {
        const queryInstance = new Query(q => q.TypeIs<ContentTypes.Task>(ContentTypes.Task));
        expect(queryInstance.toString()).to.be.eq('TypeIs:Task');
    }

    @test
    public 'Type syntax'() {
        const queryInstance = new Query(q => q.Type<ContentTypes.Task>(ContentTypes.Task));
        expect(queryInstance.toString()).to.be.eq('Type:Task');
    }

    @test
    public 'InFolder with Path'() {
        const queryInstance = new Query(q => q.InFolder('a/b/c'));
        expect(queryInstance.toString()).to.be.eq('InFolder:"a/b/c"')
    }

    @test
    public 'InFolder with Content'() {
        const repo = new MockRepository();
        const content = repo.CreateContent({ Id: 2, Path: 'a/b/c', Name: 'test', Type: 'Task' }, ContentTypes.Task);
        const queryInstance = new Query(q => q.InFolder(content));
        expect(queryInstance.toString()).to.be.eq('InFolder:"a/b/c"')
    }

    @test
    public 'InTree with Path'() {
        const queryInstance = new Query(q => q.InTree('a/b/c'));
        expect(queryInstance.toString()).to.be.eq('InTree:"a/b/c"')
    }

    @test
    public 'InTree with Content'() {
        const repo = new MockRepository();
        const content = repo.CreateContent({ Id: 2, Path: 'a/b/c', Name: 'test', Type: 'Task' }, ContentTypes.Task);
        const queryInstance = new Query(q => q.InTree(content));
        expect(queryInstance.toString()).to.be.eq('InTree:"a/b/c"')
    }

    @test
    public 'Equals'() {
        const queryInstance = new Query(q => q.Equals('DisplayName', 'test'));
        expect(queryInstance.toString()).to.be.eq('DisplayName:\'test\'')
    }

    @test
    public 'NotEquals'() {
        const queryInstance = new Query(q => q.NotEquals('DisplayName', 'test'));
        expect(queryInstance.toString()).to.be.eq('NOT(DisplayName:\'test\')')
    }

    @test
    public 'Between exclusive'() {
        const queryInstance = new Query(q => q.Between('Index', 1, 5));
        expect(queryInstance.toString()).to.be.eq('Index:{\'1\' TO \'5\'}')
    }

    @test
    public 'Between Inclusive'() {
        const queryInstance = new Query(q => q.Between('Index', 10, 50, true, true));
        expect(queryInstance.toString()).to.be.eq('Index:[\'10\' TO \'50\']')
    }

    @test
    public 'GreatherThan Exclusive'() {
        const queryInstance = new Query(q => q.GreatherThan('Index', 10));
        expect(queryInstance.toString()).to.be.eq('Index:>\'10\'')
    }


    @test
    public 'GreatherThan Inclusive'() {
        const queryInstance = new Query(q => q.GreatherThan('Index', 10, true));
        expect(queryInstance.toString()).to.be.eq('Index:>=\'10\'')
    }

    @test
    public 'LessThan Exclusive'() {
        const queryInstance = new Query(q => q.LessThan('Index', 10));
        expect(queryInstance.toString()).to.be.eq('Index:<\'10\'')
    }


    @test
    public 'LessThan Inclusive'() {
        const queryInstance = new Query(q => q.LessThan('Index', 10, true));
        expect(queryInstance.toString()).to.be.eq('Index:<=\'10\'')
    }

    @test
    public 'AND syntax'(){
        const queryInstance = new Query(q => q.Equals('Index', 1).And.Equals('DisplayName', 'Test'));
        expect(queryInstance.toString()).to.be.eq("Index:'1' AND DisplayName:'Test'")
    }

    @test
    public 'OR syntax'(){
        const queryInstance = new Query(q => q.Equals('Index', 1).Or.Equals('DisplayName', 'Test'));
        expect(queryInstance.toString()).to.be.eq("Index:'1' OR DisplayName:'Test'")
    }

    @test
    public 'inner Query'() {
        const queryInstance = new Query(q => q.Equals('DisplayName', 'Test')
            .And
            .Query(inner =>
                inner.Equals('Index', 1)
            )
        )
        expect(queryInstance.toString()).to.be.eq("DisplayName:'Test' AND (Index:'1')");
    }

    @test
    public 'NOT statement'() {
        const queryInstance = new Query(q => q.Equals('DisplayName', 'Test')
            .And
            .Not(inner =>
                inner.Equals('Index', 1)
            )
        )
        expect(queryInstance.toString()).to.be.eq("DisplayName:'Test' AND NOT(Index:'1')");
    }

    @test
    public 'OrderBy'() {
        const queryInstance = new Query(q => q.Sort('DisplayName'));
        expect(queryInstance.toString()).to.be.eq(" .SORT:'DisplayName'");
    }

    @test
    public 'OrderBy Reverse'() {
        const queryInstance = new Query(q => q.Sort('DisplayName', true));
        expect(queryInstance.toString()).to.be.eq(" .REVERSESORT:'DisplayName'");
    }


    @test
    public 'Top'() {
        const queryInstance = new Query(q => q.Top(50));
        expect(queryInstance.toString()).to.be.eq(' .TOP:50');
    }

    @test
    public 'Skip'() {
        const queryInstance = new Query(q => q.Skip(10));
        expect(queryInstance.toString()).to.be.eq(' .SKIP:10');
    }

    @test
    public 'Issue Example output'(){
        const query = new Query(q =>
            q.TypeIs<ContentTypes.Task>(ContentTypes.Task)   // adds '+TypeIs:Document' and Typescript type cast
            .And
            .Equals('DisplayName', 'Unicorn')	// adds +Title:Unicorn (TBD: fuzzy/Proximity)
            .And
            .Between('ModificationDate', '2017-01-01T00:00:00', '2017-02-01T00:00:00')
            .Or
            .Query(sub => sub //Grouping
                .NotEquals('Approvable', true)
                .And
                .NotEquals('Description', '*alma*') //Contains with wildcards
            )
            .Sort('DisplayName')
            .Top(5)			// adds .TOP:5
            .Skip(10)		// adds .SKIP:10
        );

        expect(query.toString()).to.be
            .eq("TypeIs:Task AND DisplayName:'Unicorn' AND ModificationDate:{'2017-01-01T00\\:00\\:00' TO '2017-02-01T00\\:00\\:00'} OR (NOT(Approvable:'true') AND NOT(Description:'*alma*')) .SORT:'DisplayName' .TOP:5 .SKIP:10")
    }

}