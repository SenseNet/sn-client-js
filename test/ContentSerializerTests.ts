import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { MockRepository } from './Mocks/MockRepository';
import { ContentTypes } from '../src/SN';


const expect = Chai.expect;

@suite('ContentSerializer')
export class ContentSerializerTests {

    private _content: ContentTypes.Task;

    private _contentSerializedString = '{"Data":{"Id":3,"Path":"root/task1"},"Origin":"https://mock_repo_one/odata.svc/root/task1"}';
    private _repo: MockRepository;
    private _repo2: MockRepository;

    before(){
        this._repo = new MockRepository({
            RepositoryUrl: 'https://mock_repo_one'
        });

        this._repo2 = new MockRepository({
            RepositoryUrl: 'https://mock_repo_two'
        })
        this._content = this._repo.HandleLoadedContent({
            Id: 3,
            Path: 'root/task1',
            Type: 'Task'
        });
    }

    @test
    public 'content.Stringify() should create a valid output'(){
        const serialized = this._content.Stringify();
        expect(serialized).to.be.eq(this._contentSerializedString);
    }

    @test
    public 'content.Stringify() should throw an error when no Path specified'(){
        this._content.Path = '';
        expect(() => this._content.Stringify()).to.throw();
    }

    @test
    public 'Repository.Parse should return a Content instance'(){
        const parsed = this._repo.ParseContent(this._contentSerializedString);
        expect(parsed).to.be.eq(this._content);
    }

    @test
    public 'Repository.Parse should throw an Error when trying parse a Content from a different Repository origin'(){
        expect(() => {this._repo2.ParseContent(this._contentSerializedString)}).to.throw();
    }
}
