import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { MediaResourceObject } from '../src/ComplexTypes';
import { File as SnFile } from '../src/ContentTypes';
import { BinaryField } from '../src/BinaryField';
import { SavedContent } from '../src/Content';
import { BinaryFieldSetting } from '../src/FieldSettings';
import { UploadFileOptions } from '../src/Repository/UploadModels';

const expect = Chai.expect;

@suite('BinaryField')
export class BinaryFieldTests {
    private _fieldSetting: BinaryFieldSetting;
    private _file: SavedContent<SnFile>;
    before() {
        this._fieldSetting = new BinaryFieldSetting({
            name: 'Binary'
        });
        this._file = {
            Binary: {
                __mediaresource: {
                    media_src: 'https://google.com'
                }
            }
        } as SavedContent<SnFile>
    }

    @test
    public 'Can be constructed'() {
        const field = new BinaryField(this._file.Binary as MediaResourceObject, this._file, this._fieldSetting);
        expect(field).to.be.instanceof(BinaryField);
    }

    @test
    public 'MediaResourceObject should be available'() {
        const field = new BinaryField(this._file.Binary as MediaResourceObject, this._file, this._fieldSetting);
        expect(field.GetMediaResourceObject()).to.be.instanceof(Object);
        expect(field.GetMediaResourceObject().__mediaresource).to.be.instanceof(Object);
        expect(field.GetMediaResourceObject().__mediaresource.media_src).to.be.eq('https://google.com');
    }

    @test
    public 'DownloadUrl should be available'() {
        const field = new BinaryField(this._file.Binary as MediaResourceObject, this._file, this._fieldSetting);
        expect(field.GetDownloadUrl()).to.be.eq('https://google.com');
    }

    @test
    public 'SaveBinaryFile() should trigger an upload request'(done: MochaDone) {
        (this._file as any)['GetRepository'] = () => {
            return {
                UploadFile: (options: UploadFileOptions<SnFile>) => {
                    expect(options).to.be.instanceof(Object);
                    done();
                }
            }
        };

        const field = new BinaryField(this._file.Binary as MediaResourceObject, this._file, this._fieldSetting);
        field.SaveBinaryFile(new File(['alma'], 'alma.txt'));
    }

}
