import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { LoginState } from '../src/Authentication';
import { SnConfigModel } from '../src/Config';
import { Content, ContentInternal } from '../src/Content';
import { ContentType, File as SnFile, Task, User } from '../src/ContentTypes';
import { ODataApi, ODataBatchResponse, ODataCollectionResponse } from '../src/ODataApi';
import { SnRepository, UploadProgressInfo, UploadResponse, VersionInfo } from '../src/Repository';
import { Schema, SchemaStore } from '../src/Schemas';
import { MockHttpProvider, MockRepository } from './Mocks';

const expect = Chai.expect;

@suite('RepositoryTests')
export class RepositoryTests {

    private _repo: MockRepository;

    // tslint:disable-next-line:naming-convention
    public before() {
        this._repo = new MockRepository({
            RepositoryUrl: 'https://localhost',
            ODataToken: 'odata.svc'
        });

        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);
    }

    @test
    public 'ODataBaseUrl should return a valid URL based on RepositoryUrl and ODataToken'() {
        expect(this._repo.ODataBaseUrl).to.be.eq('https://localhost/odata.svc');
    }

    @test public 'GetVersionInfo should return a valid Version Info'() {
        const vResponse = new VersionInfo();
        vResponse.DatabaseAvailable = true;
        (this._repo.HttpProviderRef as MockHttpProvider).AddResponse(vResponse);

        this._repo.GetVersionInfo().first().subscribe((result) => {
            expect(result.DatabaseAvailable).to.be.eq(true);
        });
    }

    @test public 'GetAllContentTypes should be return a valid content type collection'(done: MochaDone) {

        const cResponse = {
            d: {
                __count: 1,
                results: [
                    {
                        Name: 'testContentType',
                        Type: 'ContentType',
                    }
                ]
            }
        } as ODataCollectionResponse<ContentType>;
        this._repo.HttpProviderRef.AddResponse(cResponse);
        this._repo.GetAllContentTypes().first().subscribe((types) => {
            expect(types.length).to.be.eq(1);
            expect(types[0].Name).to.be.eq('testContentType');
            expect(types[0]).to.be.instanceof(ContentInternal);
            done();
        }, done);
    }

    @test public 'Load should return a valid Content'(done: MochaDone) {
        const cResponse = {
            d: {
                Name: 'testContentType',
                Type: 'ContentType'
            }
        };
        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);
        this._repo.HttpProviderRef.AddResponse(cResponse);
        this._repo.Load(1).first().subscribe((response) => {
            expect(response.Name).to.be.eq('testContentType');
            expect(response).to.be.instanceof(ContentInternal);
            done();
        }, (err) => {
            done(err);
        });
    }

    @test public 'Load should return a valid Content with a valid type, if defined'(done: MochaDone) {
        const cResponse = {
            d: {
                Name: 'testContentType',
                Type: 'User',
                LoginName: 'alba'
            }
        };
        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);
        this._repo.HttpProviderRef.AddResponse(cResponse);
        this._repo.Load<User>(1).first().subscribe((response) => {
            expect(response.LoginName).to.be.eq('alba'); // For type checking
            expect(response.Name).to.be.eq('testContentType');
            expect(response).to.be.instanceof(ContentInternal);
            done();
        }, (err) => {
            done(err);
        });
    }

    @test public 'SnRepository should have a default Config, if not provided'() {
        const snRepo = new SnRepository();
        expect(snRepo.Config.RepositoryUrl).to.be.eq(SnConfigModel.DEFAULT_BASE_URL);
    }

    @test public 'SnRepository should respect the provided config'() {
        const snRepo = new SnRepository(new SnConfigModel({
            RepositoryUrl: 'https://demo.sensenet.com'
        }));
        expect(snRepo.Config.RepositoryUrl).to.be.eq('https://demo.sensenet.com');
    }

    @test public 'HandleLoadedContent should respect content type (with fields) from generic'() {
        const snRepo = new SnRepository(new SnConfigModel({
            RepositoryUrl: 'https://demo.sensenet.com'
        }));
        const task = snRepo.HandleLoadedContent<Task>({
            Id: 100,
            Path: 'Root/Test',
            Type: 'Task',
            Name: 'Task',
            DueText: 'testDueText'
        });

        const usr = snRepo.HandleLoadedContent<User>({
            Id: 200,
            Path: 'Root/Test',
            Name: 'User',
            Type: 'User',
            LoginName: 'testLoginName'
        });

        const content = snRepo.HandleLoadedContent({
            Id: 300,
            Path: 'Root/Test',
            Name: ''
        });
        expect(task).to.be.instanceof(ContentInternal);
        expect(task.DueText).to.be.eq('testDueText');

        expect(usr).to.be.instanceof(ContentInternal);
        expect(usr.LoginName).to.be.eq('testLoginName');

        expect(content).to.be.instanceof(ContentInternal);
    }

    @test public 'Content should return an ODataApi instance'() {
        const snRepo = new SnRepository();
        expect(snRepo.Content).to.be.instanceOf(ODataApi);
    }

    @test public 'Should be able to create content using repository.CreateContent() '() {
        const snRepo = new SnRepository();
        const exampleTask = snRepo.CreateContent({ DueText: 'testDueText' }, Task);
        expect(exampleTask).to.be.instanceOf(ContentInternal);
        expect(exampleTask.DueText).to.be.eq('testDueText');
    }

    @test public 'DeleteBatch() should fire a DeleteBatch request'(done: MochaDone) {
        this._repo.HttpProviderRef.AddResponse({ d: { __count: 0, errors: [], results: [] } } as ODataBatchResponse);
        const testContent = this._repo.HandleLoadedContent<Task>({
            Id: 12345, Path: 'Root/Test', Name: 'Task'
        });
        this._repo.DeleteBatch([testContent]).subscribe((r) => {
            expect(this._repo.HttpProviderRef.LastOptions.url).to.contains("https://localhost/odata.svc/('Root')/DeleteBatch");
            expect(this._repo.HttpProviderRef.LastOptions.body).to.be.eq('{"paths":[12345],"permanent":false}');
            expect(this._repo.HttpProviderRef.LastOptions.method).to.be.eq('POST');
            done();

        }, (err) => {
            done(err);
        });

    }

    @test public 'DeleteBatch() should fire a DeleteBatch request by path'(done: MochaDone) {
        const testContentWithoutId = this._repo.HandleLoadedContent({ Path: 'Root/Test2' } as any);
        this._repo.HttpProviderRef.AddResponse({ d: { __count: 0, errors: [], results: [] } } as ODataBatchResponse);
        this._repo.DeleteBatch([testContentWithoutId]).subscribe((res) => {
            expect(this._repo.HttpProviderRef.LastOptions.url).to.contains("https://localhost/odata.svc/('Root')/DeleteBatch");
            expect(this._repo.HttpProviderRef.LastOptions.body).to.be.eq('{"paths":["Root/Test2"],"permanent":false}');
            expect(this._repo.HttpProviderRef.LastOptions.method).to.be.eq('POST');
            done();
        }, (err) => done(err));
    }

    @test public 'DeleteBatch() should trigger ContentDeleted event after success'(done: MochaDone) {
        const testContent = this._repo.HandleLoadedContent<Task>({ Id: 12345, Path: 'Root/Test', Name: 'Task' });
        this._repo.Events.OnContentDeleted.subscribe((c) => {
            expect(c.ContentData.Id).to.be.eq(testContent.Id);
            done();
        });
        this._repo.HttpProviderRef.AddResponse({ d: { __count: 1, errors: [], results: [{ Id: 12345, Path: 'Root/Test', Name: 'Task' }] } } as ODataBatchResponse);
        const action = this._repo.DeleteBatch([testContent]);
        expect(action).to.be.instanceof(Observable);
    }

    @test public 'DeleteBatch() should trigger ContentDeleteFailed event on errored operations'(done: MochaDone) {
        const testContent = this._repo.HandleLoadedContent<Task>({ Id: 12345, Path: 'Root/Test', Name: 'Task' });
        this._repo.Events.OnContentDeleteFailed.subscribe((c) => {
            expect(c.Content).to.be.eq(testContent);
            done();
        }, (err) => done(err));
        this._repo.HttpProviderRef.AddResponse({
            d: {
                __count: 1,
                results: [],
                errors: [
                    {
                        content: { Id: 12345, Path: 'Root/Test', Name: 'Task' },
                        error: { message: '' }
                    }
                ]
            }
        } as ODataBatchResponse);
        const action = this._repo.DeleteBatch([testContent]);
        expect(action).to.be.instanceof(Observable);
    }

    @test public 'DeleteBatch() should return error on fail'(done: MochaDone) {
        const testContent = this._repo.HandleLoadedContent<Task>({ Id: 12345, Path: 'Root/Test', Name: 'Task' });
        this._repo.HttpProviderRef.AddError(Error(':(' ));
        const action = this._repo.DeleteBatch([testContent]);
        action.subscribe(() => {
            done('This shouldn\'t be triggered');
        }, (err) => done());
        expect(action).to.be.instanceof(Observable);
    }

    @test public 'MoveBatch() should fire a MoveBatch request'(done: MochaDone) {
        const testContent = this._repo.HandleLoadedContent<Task>({ Id: 12345, Path: 'Root/Test', Name: 'Task' });
        this._repo.HttpProviderRef.AddResponse({d: { __count: 0}} as ODataBatchResponse);
        this._repo.MoveBatch([testContent], 'Root/Test2').subscribe((r) => {
            expect(this._repo.HttpProviderRef.LastOptions.url).to.contains("https://localhost/odata.svc/('Root')/MoveBatch");
            expect(this._repo.HttpProviderRef.LastOptions.body).to.be.eq('[{"paths":["Root/Test"],"targetPath":"Root/Test2"}]');
            expect(this._repo.HttpProviderRef.LastOptions.method).to.be.eq('POST');
            done();
        });
    }

    @test public 'MoveBatch() should trigger ContentMoved event after success'(done: MochaDone) {
        const testContent = this._repo.HandleLoadedContent<Task>({ Id: 12345, Path: 'Root/Test', Name: 'task' });
        const sourcePath = testContent.Path;

        this._repo.Events.OnContentMoved.subscribe((c) => {
            expect(c.Content.Id).to.be.eq(testContent.Id);
            expect(c.From).to.be.eq(sourcePath);
            expect(c.To).to.be.eq('Root/Test2');
            done();
        });
        this._repo.HttpProviderRef.AddResponse({d: { __count: 1, errors: [], results: [{
            Id: 12345,
            Path: 'Root/Test2',
            Name: 'Task'
        }]}} as ODataBatchResponse);
        const action = this._repo.MoveBatch([testContent], 'Root/Test2');
        expect(action).to.be.instanceof(Observable);
    }

    @test public 'MoveBatch() should trigger ContentMoveFailed event after failure'(done: MochaDone) {
        const testContent = this._repo.HandleLoadedContent<Task>({ Id: 12345, Path: 'Root/Test', Name: 'task' });
        this._repo.Events.OnContentMoveFailed.subscribe((c) => {
            expect(c.Content).to.be.eq(testContent);
            done();
        });
        this._repo.HttpProviderRef.AddResponse({d: { __count: 1, results: [], errors: [{
            content: {
                Id: 12345,
                Path: 'Root/Test2',
                Name: 'Task'
            },
            error: ':('
        }]}} as ODataBatchResponse);
        const action = this._repo.MoveBatch([testContent], 'Root/Test2');
        expect(action).to.be.instanceof(Observable);
    }

    @test public 'MoveBatch() should trigger fail on request error'(done: MochaDone) {
        const testContent = this._repo.HandleLoadedContent<Task>({ Id: 12345, Path: 'Root/Test', Name: 'task' });
        this._repo.HttpProviderRef.AddError({ message: ':(' });
        const action = this._repo.MoveBatch([testContent], 'Root/Test2');
        action.subscribe(() => {
            done('Should fail');
        }, (err) => done());
        expect(action).to.be.instanceof(Observable);
    }

    @test public 'CopyBatch() should fire a CopyBatch request'(done: MochaDone) {
        const testContent = this._repo.HandleLoadedContent<Task>({ Id: 12345, Path: 'Root/Test', Name: 'task' });
        this._repo.HttpProviderRef.AddResponse({d: { __count: 0}} as ODataBatchResponse);
        this._repo.CopyBatch([testContent], 'Root/Test2').subscribe((r) => {
            expect(this._repo.HttpProviderRef.LastOptions.url).to.contains("https://localhost/odata.svc/('Root')/CopyBatch");
            expect(this._repo.HttpProviderRef.LastOptions.body).to.be.eq('[{"paths":["Root/Test"],"targetPath":"Root/Test2"}]');
            expect(this._repo.HttpProviderRef.LastOptions.method).to.be.eq('POST');
            done();
        }, (err) => done(err));
    }

    @test public 'CopyBatch() should trigger ContentCreated event after success'(done: MochaDone) {
        const testContent = this._repo.HandleLoadedContent<Task>({ Id: 12345, Path: 'Root/Test', Name: 'task' });
        this._repo.Events.OnContentCreated.subscribe((c) => {
            expect(c.Content.Id).to.be.eq(testContent.Id);
            done();
        });
        this._repo.HttpProviderRef.AddResponse({d: { __count: 1, errors: [], results: [{
            Id: 12345,
            Path: 'Root/Test2',
            Name: 'Task'
        }]}} as ODataBatchResponse);
        const action = this._repo.CopyBatch([testContent], 'Root/Test2');
        expect(action).to.be.instanceof(Observable);
    }

    @test public 'CopyBatch() should trigger ContentCreateFailed event after failure'(done: MochaDone) {
        const testContent = this._repo.HandleLoadedContent<Task>({ Id: 12345, Path: 'Root/Test', Name: 'task' });
        this._repo.Events.OnContentCreateFailed.subscribe((c) => {
            expect(c.Content.Id).to.be.eq(testContent.Id);
            done();
        });
        this._repo.HttpProviderRef.AddResponse({d: { __count: 1, results: [], errors: [{
            content: {
                Id: 12345,
                Path: 'Root/Test2',
                Name: 'Task'
            },
            error: ':('
        }]}} as ODataBatchResponse);
        const action = this._repo.CopyBatch([testContent], 'Root/Test2');
        expect(action).to.be.instanceof(Observable);
    }

    @test public 'CopyBatch() should fail on request error'(done: MochaDone) {
        const testContent = this._repo.HandleLoadedContent<Task>({ Id: 12345, Path: 'Root/Test', Name: 'task' });
        this._repo.HttpProviderRef.AddError({message: ':('});
        const action = this._repo.CopyBatch([testContent], 'Root/Test2');
        action.subscribe((a) => {
            done('Should fail');
        }, (err) => {
            done();
        });
        expect(action).to.be.instanceof(Observable);
    }

    @test public 'UploadResponse can be constructed'() {
        const model = new UploadResponse('123', 'chunkToken', true, true);
        expect(model).to.be.instanceof(UploadResponse);
    }

    @test public 'Upload() should trigger UploadProgress event'(done: MochaDone) {
        this._repo.Config.ChunkSize = 1024 * 1024;
        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);

        const testContent = this._repo.HandleLoadedContent<Task>({ Id: 12345, Path: 'Root/Test', Name: 'task' });
        this._repo.Events.OnUploadProgress.subscribe((pi) => {
            expect(pi).to.be.instanceof(Object);
            done();
        }, (err) => done(err));
        this._repo.HttpProviderRef
            .AddResponse({ Id: 12356, Path: 'Root/Test/alma' })
            .AddResponse({ d: { Id: 12356, Path: 'Root/Test/alma' } });

        const mockFile = new File(['alma'], 'alma.txt');
        Object.assign((mockFile as any), {
            size: 8
        });

        testContent.UploadFile({ ContentType: SnFile, File: mockFile as File, PropertyName: 'Binary', Body: {}, Overwrite: true })
            .subscribe((progress) => { /**/ }, (err) => done(err));
    }

    @test public 'Upload() should trigger ContentCreated event'(done: MochaDone) {
        this._repo.Config.ChunkSize = 1024 * 1024;
        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);

        const testContent = this._repo.HandleLoadedContent<Task>({ Id: 12345, Path: 'Root/Test', Name: 'task' });
        this._repo.Events.OnContentCreated.subscribe((pi) => {
            expect(pi).to.be.instanceof(Object);
            done();
        }, (err) => done(err));
        this._repo.HttpProviderRef
            .AddResponse({ Id: 12356, Path: 'Root/Test/alma' })
            .AddResponse({ d: { Id: 12356, Path: 'Root/Test/alma' } });
        const mockFile = new File(['alma'], 'alma.txt');
        Object.assign((mockFile as any), {
            size: 8
        });

        testContent.UploadFile({ ContentType: SnFile, File: mockFile as File, PropertyName: 'Binary', Body: {}, Overwrite: true })
            .subscribe((progress) => { /**/ }, (err) => done(err));
    }

    @test public 'Upload() failure should trigger ContentCreateFailed event'(done: MochaDone) {
        this._repo.Config.ChunkSize = 1024 * 1024;
        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);
        this._repo.HttpProviderRef
            .AddError(Error('e'))
            .AddResponse({ d: { Id: 12356, Path: 'Root/Test/alma' } });

        const testContent = this._repo.HandleLoadedContent<Task>({ Id: 12345, Path: 'Root/Test', Name: 'task' });
        this._repo.Events.OnUploadProgress.subscribe((pi) => {
            done('This shouldn\'t be triggered');
        });
        this._repo.Events.OnContentCreateFailed.subscribe((failure) => {
            done();
        });
        const mockFile = new File(['alma'], 'alma.txt');
        Object.assign((mockFile as any), {
            size: 8
        });

        testContent.UploadFile({ ContentType: SnFile, File: mockFile as File, PropertyName: 'Binary', Body: {}, Overwrite: true })
            .subscribe((progress) => { /**/ });
    }

    @test public 'Upload() chunked content should trigger multiple UploadProgress requests and resolves from Upload observable'(done: MochaDone) {
        this._repo.Config.ChunkSize = 4;
        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);
        this._repo.HttpProviderRef
            .AddResponse('9865*chunk-token*true*true')              // first upload
            .AddResponse({})                                        // Mocked chunks
            .AddResponse({})
            .AddResponse({})
            .AddResponse({ d: { Id: 12356, Path: 'Root/Test/alma' } });  // Content reload;

        const testContent = this._repo.HandleLoadedContent<Task>({ Id: 12345, Path: 'Root/Test', Name: 'task' });
        let uploadReqCount = 0;

        this._repo.Events.OnUploadProgress.subscribe((pi) => {
            uploadReqCount = pi.UploadedChunks;
        }, (err) => done(err), () => {
            expect(uploadReqCount).to.be.eq(3);
            done();
        });
        const mockFile = new File(['alma'], 'alma.txt');
        Object.assign((mockFile as any), {
            size: 12
        });

        testContent.UploadFile({ ContentType: SnFile, File: mockFile as File, PropertyName: 'Binary', Body: {}, Overwrite: true })
            .subscribe((progress) => {
                if (progress.Completed) {
                    expect(progress.ChunkCount).to.be.eq(progress.UploadedChunks);
                    expect(uploadReqCount).to.be.eq(progress.ChunkCount);
                    done();
                }
            });
    }
    @test public 'Upload() chunked content should trigger multiple UploadProgress requests and resolves from UploadProgress observable'(done: MochaDone) {
        this._repo.Config.ChunkSize = 4;
        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);
        this._repo.HttpProviderRef
            .AddResponse('9865*chunk-token*true*true')              // first upload
            .AddResponse({})                                        // Mocked chunks
            .AddResponse({})
            .AddResponse({})
            .AddResponse({ d: { Id: 12356, Path: 'Root/Test/alma' } });  // Content reload;

        const testContent = this._repo.HandleLoadedContent<Task>({ Id: 12345, Path: 'Root/Test', Name: 'task' });

        this._repo.Events.OnUploadProgress.subscribe((progress) => {
            if (progress.Completed) {
                expect(progress.ChunkCount).to.be.eq(progress.UploadedChunks);
                done();
            }
        }, (err) => done(err));
        const mockFile = new File(['alma'], 'alma.txt');
        Object.assign((mockFile as any), {
            size: 12
        });

        testContent.UploadFile<SnFile>({ ContentType: SnFile, File: mockFile as File, PropertyName: 'Binary', Body: {}, Overwrite: true })
            .subscribe((progress) => { /**/ }, (err) => done(err));
    }

    @test public 'UploadTextAsFile should trigger an Upload request'(done: MochaDone) {
        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);
        (this._repo as any).UploadFile = (...args: any[]) => {
            done();
        };

        this._repo.UploadTextAsFile({
            Text: 'alma',
            ContentType: SnFile,
            Overwrite: true,
            Parent: this._repo.HandleLoadedContent({ Id: 12379846, Path: '/Root/Text', Name: 'asd' }),
            PropertyName: 'Binary',
            FileName: 'alma.txt'
        });
    }

    @test public 'UploadFromDropEvent should trigger an Upload request w/o webkitRequestFileSystem'(done: MochaDone) {
        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);
        (this._repo as any).UploadFile = (...args: any[]) => {
            done();
            return Observable.of([true]);
        };

        (global as any).window = {};
        const file = new File(['alma.txt'], 'alma');
        Object.assign(file, { type: 'file' });
        this._repo.UploadFromDropEvent({
            Event: {
                dataTransfer: {
                    files: [
                        file
                    ]
                }
            } as any,
            Overwrite: true,
            ContentType: SnFile,
            CreateFolders: false,
            PropertyName: 'Binary',
            Parent: this._repo.HandleLoadedContent({ Id: 12379846, Path: '/Root/Text', Name: 'asd' })
        });
    }

    @test public 'UploadFromDropEvent should trigger an Upload request with webkitRequestFileSystem'(done: MochaDone) {
        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);
        (this._repo as any).UploadFile = (...args: any[]) => {
            done();
            return Observable.of([true]);
        };

        (global as any).window = { webkitRequestFileSystem: () => { /**/ } };
        const file = {
            isFile: true,
            file: (cb: (f: File) => void) => { cb(new File(['alma.txt'], 'alma')); }
        };
        this._repo.UploadFromDropEvent({
            Event: {
                dataTransfer: {
                    items: [
                        { webkitGetAsEntry: () => file }
                    ]
                }
            } as any,
            Overwrite: true,
            ContentType: SnFile,
            CreateFolders: false,
            PropertyName: 'Binary',
            Parent: this._repo.HandleLoadedContent({ Id: 12379846, Path: '/Root/Text', Name: 'asd' })
        });
    }

    @test public 'UploadFromDropEvent should upload a file and distribute proper status info'(done: MochaDone) {
        (this._repo as any).UploadFile = (...args: any[]) => {
            return Observable.of({
                ChunkCount: 1,
                Completed: true,
                CreatedContent: { Id: 123456 },
                UploadedChunks: 1
            } as UploadProgressInfo<Content>);
        };

        (global as any).window = { webkitRequestFileSystem: () => { /**/ } };
        const file = {
            isFile: true,
            file: (cb: (f: File) => void) => { cb(new File(['alma.txt'], 'alma')); }
        };
        this._repo.UploadFromDropEvent({
            Event: {
                dataTransfer: {
                    items: [
                        { webkitGetAsEntry: () => file }
                    ]
                }
            } as any,
            Overwrite: true,
            ContentType: SnFile,
            CreateFolders: false,
            PropertyName: 'Binary',
            Parent: this._repo.HandleLoadedContent({ Id: 12379846, Path: '/Root/Text', Name: 'asd' }, SnFile)
        }).then((result) => {
            done();
        }).catch((err) => done(err));
    }

    @test public 'UploadFromDropEvent should distribute an error on upload failure'(done: MochaDone) {
        (this._repo as any).UploadFile = (...args: any[]) => {
            const sub = new Subject();
            setTimeout(() => {
                sub.error('erroor');
            }, 10);
            return sub.asObservable;
        };

        (global as any).window = { webkitRequestFileSystem: () => { /**/ } };
        const file = {
            isFile: true,
            file: (cb: (f: File) => void) => { cb(new File(['alma.txt'], 'alma')); }
        };
        this._repo.UploadFromDropEvent({
            Event: {
                dataTransfer: {
                    items: [
                        { webkitGetAsEntry: () => file }
                    ]
                }
            } as any,
            Overwrite: true,
            ContentType: SnFile,
            CreateFolders: false,
            PropertyName: 'Binary',
            Parent: this._repo.HandleLoadedContent({ Id: 12379846, Path: '/Root/Text', Name: 'asd' }, SnFile)
        }).then((result) => {
            done('This shouldn\'t be called on error');
        }).catch((err) => done());
    }

    @test public 'UploadFromDropEvent should distribute an error on file read failure'(done: MochaDone) {
        (this._repo as any).UploadFile = (...args: any[]) => {
            return Observable.of({
                ChunkCount: 1,
                Completed: true,
                CreatedContent: { Id: 123456 },
                UploadedChunks: 1
            } as UploadProgressInfo<Content>);
        };

        (global as any).window = { webkitRequestFileSystem: () => { /**/ } };
        const file = {
            isFile: true,
            file: (cb: (f: File) => void, err: (err: any) => void) => { err('File read fails here...'); }
        };
        this._repo.UploadFromDropEvent({
            Event: {
                dataTransfer: {
                    items: [
                        { webkitGetAsEntry: () => file }
                    ]
                }
            } as any,
            Overwrite: true,
            ContentType: SnFile,
            CreateFolders: false,
            PropertyName: 'Binary',
            Parent: this._repo.HandleLoadedContent({ Id: 12379846, Path: '/Root/Text', Name: 'asd' }, SnFile)
        }).then((result) => {
            done('This shouldn\'t be called on error');
        }).catch((err) => done());
    }

    @test public 'UploadFromDropEvent should create Directories'(done: MochaDone) {

        (global as any).window = { webkitRequestFileSystem: () => { /**/ } };

        this._repo.HttpProviderRef.AddResponse({ d: { Id: 123456, Path: 'Root/Folder', Name: 'Example' } });

        (this._repo as any).UploadFile = (...args: any[]) => {
            return Observable.of({
                ChunkCount: 1,
                Completed: true,
                CreatedContent: { Id: 123456 },
                UploadedChunks: 1
            } as UploadProgressInfo<Content>);
        };
        const directory = {
            isFile: false,
            isDirectory: true,
            createReader: () => {
                return {
                    readEntries: (cb: (entries: any) => void, err: (err: any) => void) => {
                        cb([
                            {
                                isFile: true,
                                isDirectory: false,
                                name: 'ExampleDirectory',
                                file: (callback: (f: File) => void) => { callback(new File(['alma.txt'], 'alma')); }
                            }
                        ]);
                    }
                };
            }
        };

        this._repo.UploadFromDropEvent({
            Event: {
                dataTransfer: {
                    items: [
                        { webkitGetAsEntry: () => directory }
                    ]
                }
            } as any,
            Overwrite: true,
            ContentType: SnFile,
            CreateFolders: true,
            PropertyName: 'Binary',
            Parent: this._repo.HandleLoadedContent({ Id: 12379846, Path: '/Root/Text', Name: 'asd' }, SnFile)
        }).then((result) => {
            done();
        }).catch((err) => done(err));
    }

    @test public 'UploadFromDropEvent should fail on error when creating a folder'(done: MochaDone) {

        (global as any).window = { webkitRequestFileSystem: () => { /**/ } };
        this._repo.HttpProviderRef.AddError('neeee');
        (this._repo as any).UploadFile = (...args: any[]) => {
            return Observable.of({
                ChunkCount: 1,
                Completed: true,
                CreatedContent: { Id: 123456 },
                UploadedChunks: 1
            } as UploadProgressInfo<Content>);
        };
        const directory = {
            isFile: false,
            isDirectory: true,
        };

        this._repo.UploadFromDropEvent({
            Event: {
                dataTransfer: {
                    items: [
                        { webkitGetAsEntry: () => directory }
                    ]
                }
            } as any,
            Overwrite: true,
            ContentType: SnFile,
            CreateFolders: true,
            PropertyName: 'Binary',
            Parent: this._repo.HandleLoadedContent<User>({ Id: 12379846, Path: '/Root/Text', Name: 'asd' })
        }).then((result) => {
            done('This shouldn\'t be triggered on error');
        }).catch((err) => done());
    }

    @test public 'GetCurrentUser() should return an Observable '() {
        const repo = new MockRepository();
        expect(repo.GetCurrentUser()).to.be.instanceof(Observable);
    }

    @test public 'GetCurrentUser() should update with Visitor by default '(done: MochaDone) {
        const repo = new MockRepository();
        repo.GetCurrentUser().subscribe((u) => {
            expect(u.Name).to.be.eq('Visitor');
            done();
        }, done);
    }

    @test public 'GetCurrentUser() should update with the new User on change '(done: MochaDone) {
        const repo = new MockRepository();
        repo.HttpProviderRef.AddResponse({
            d: {
                __count: 1,
                results: [{
                    Name: 'NewUser',
                    Domain: 'BuiltIn',
                    Id: 1000,
                    LoginName: 'NewUser',
                    Type: 'User',
                }]
            }
        });
        repo.Authentication.CurrentUser = 'BuiltIn\\NewUser';
        repo.Authentication.StateSubject.next(LoginState.Pending);
        repo.Authentication.StateSubject.next(LoginState.Authenticated);
        repo.GetCurrentUser().subscribe((u) => {
            expect(u.Name).to.be.eq('NewUser');
            done();
        }, done);
    }

    @test public 'GetCurrentUser() should not update if multiple users found  on change '(done: MochaDone) {
        const repo = new MockRepository();
        repo.Authentication.StateSubject.next(LoginState.Pending);
        repo.Authentication.CurrentUser = 'BuiltIn\\NewUser';

        repo.GetCurrentUser().subscribe((u) => {
            done('Error should be thrown here.');
        }, (err) => {
            expect(err).to.be.eq("Error getting current user: found multiple users with login name 'NewUser' in domain 'BuiltIn'");
            done();
        });

        repo.HttpProviderRef.AddResponse({
            d: {
                __count: 2,
                results: [{
                    Name: 'NewUser',
                    Id: 1000,
                    LoginName: 'NewUser',
                    Domain: 'BuiltIn',
                    Type: 'User',
                },
                {
                    Name: 'NewUser',
                    Id: 1000,
                    LoginName: 'NewUser',
                    Domain: 'BuiltIn',
                    Type: 'User',
                }]
            }
        });
        repo.Authentication.StateSubject.next(LoginState.Authenticated);
    }

    @test public 'SchemaStore should be the generated SchemaStore by default'() {
        const localRepo = new MockRepository();
        // tslint:disable-next-line:no-string-literal
        expect(localRepo['_schemaStore']).to.be.deep.eq(SchemaStore);
    }

    @test public 'Schould be able to update Schemas with SetSchemas()'() {
        const localRepo = new MockRepository();
        const newSchemaStore = [{} as Schema];
        localRepo.SetSchemas(newSchemaStore);
        // tslint:disable-next-line:no-string-literal
        expect(localRepo['_schemaStore']).to.be.deep.eq(newSchemaStore);
    }

}
