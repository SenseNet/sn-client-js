import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { MockRepository } from './Mocks/MockRepository';
import { ContentTypes } from '../src/SN';


const expect = Chai.expect;

@suite('ContentSerializer')
export class ContentSerializerTests {

    private content: ContentTypes.Task;

    private contentSerializedString = '{"Data":{"Id":3,"Path":"root/task1"},"Origin":"https://mock_repo_one/odata.svc/root/task1"}';
    private repo: MockRepository;
    private repo2: MockRepository;

    before(){
        this.repo = new MockRepository({
            RepositoryUrl: 'https://mock_repo_one'
        });

        this.repo2 = new MockRepository({
            RepositoryUrl: 'https://mock_repo_two'
        })
        this.content = this.repo.HandleLoadedContent({
            Id: 3,
            Path: 'root/task1',
            Type: 'Task'
        });
    }

    @test
    public 'content.Stringify() should create a valid output'(){
        const serialized = this.content.Stringify();
        expect(serialized).to.be.eq(this.contentSerializedString);
    }

    @test
    public 'content.Stringify() should throw an error when no Path specified'(){
        this.content.Path = '';
        expect(() => this.content.Stringify()).to.throw();
    }

    @test
    public 'Repository.Parse should return a Content instance'(){
        const parsed = this.repo.ParseContent(this.contentSerializedString);
        expect(parsed).to.be.eq(this.content);
    }

    @test
    public 'Repository.Parse should throw an Error when trying parse a Content from a different Repository origin'(){
        expect(() => {this.repo2.ParseContent(this.contentSerializedString)}).to.throw();
    }        
}
