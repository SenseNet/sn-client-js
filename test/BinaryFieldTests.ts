import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { BinaryField } from '../src/BinaryField';
import { SavedContent } from '../src/Content';
import { File as SnFile } from '../src/ContentTypes';
import { BinaryFieldSetting } from '../src/FieldSettings';
import { UploadFileOptions, WithParentContent } from '../src/Repository/UploadModels';
import { MockRepository } from './Mocks';

const expect = Chai.expect;

@suite('BinaryField')
export class BinaryFieldTests {
    private _fieldSetting: BinaryFieldSetting;
    private _file: SavedContent<SnFile>;

    private _repo: MockRepository;
    // tslint:disable-next-line:naming-convention
    public before() {

        this._repo = new MockRepository();

        this._fieldSetting = {
            name: 'Binary'
        } as any as BinaryFieldSetting;
        this._file = this._repo.HandleLoadedContent<SnFile>({
            Id: 123,
            Path: 'Root/Examples/ExampleFile',
            Name: 'test',
            Type: 'File',
            Binary: {
                __mediaresource: {
                    media_src: 'https://google.com'
                }
            }
        } as any);
    }

    private createField(): BinaryField<SnFile> {
        return this._file.Binary as BinaryField<SnFile>;
    }

    @test
    public 'Can be constructed'() {
        const field = this.createField();
        expect(field).to.be.instanceof(BinaryField);
    }

    @test
    public 'MediaResourceObject should be available'() {
        const field = this.createField();
        expect(field.GetMediaResourceObject()).to.be.instanceof(Object);
        expect(field.GetMediaResourceObject().__mediaresource).to.be.instanceof(Object);
        expect(field.GetMediaResourceObject().__mediaresource.media_src).to.be.eq('https://google.com');
    }

    @test
    public 'DownloadUrl should be available'() {
        const field = this.createField();
        expect(field.GetDownloadUrl()).to.be.eq('https://google.com');
    }

    @test
    public 'Parent.GetFullPath() should return the ParentContentPath'(done: MochaDone) {
        (this._file as any).GetRepository = () => {
            return {
                UploadFile: (options: WithParentContent<UploadFileOptions<SnFile>>) => {
                    expect(options.Parent.GetFullPath()).to.be.eq(this._file.ParentContentPath);
                    expect(options).to.be.instanceof(Object);
                    done();
                }
            };
        };

        const field = this.createField();
        field.SaveBinaryFile(new File(['alma'], 'alma.txt'));
    }

    @test
    public 'SaveBinaryFile() should trigger an upload request'(done: MochaDone) {
        (this._file as any).GetRepository = () => {
            return {
                UploadFile: (options: UploadFileOptions<SnFile>) => {
                    expect(options.Overwrite).to.be.eq(true);
                    expect(options.File.name).to.be.eq(this._file.Name);
                    expect(options).to.be.instanceof(Object);
                    done();
                }
            };
        };

        const field = this.createField();
        field.SaveBinaryFile(new File(['alma'], 'alma.txt'));
    }

    @test
    public 'SaveBinaryText() should trigger an upload request'(done: MochaDone) {
        (this._file as any).GetRepository = () => {
            return {
                UploadFile: (options: UploadFileOptions<SnFile>) => {
                    expect(options).to.be.instanceof(Object);
                    done();
                }
            };
        };

        const field = this.createField();
        field.SaveBinaryText('alma');
    }

}
