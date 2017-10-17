import * as Chai from 'chai';
import { suite, test } from 'mocha-typescript';
import { SnConfigModel } from '../src/Config';
import { MockRepository, MockHttpProvider } from './Mocks';
import { VersionInfo, SnRepository, UploadResponse, UploadProgressInfo } from '../src/Repository';
import { Content } from '../src/Content';
import { LoginState } from '../src/Authentication';
import { ODataCollectionResponse, ODataApi } from '../src/ODataApi';
import { User, Task, ContentType } from '../src/ContentTypes';
import { Observable, Subject } from '@reactivex/rxjs';
import { ContentTypes } from '../src/SN';

const expect = Chai.expect;

@suite('RepositoryTests')
export class RepositoryTests {

    private _repo: MockRepository;

    public before() {
        this._repo = new MockRepository({
            RepositoryUrl: 'https://localhost',
            ODataToken: 'odata.svc'
        });

        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);
    };

    @test
    public 'ODataBaseUrl should return a valid URL based on RepositoryUrl and ODataToken'() {
        expect(this._repo.ODataBaseUrl).to.be.eq('https://localhost/odata.svc');
    }

    @test 'GetVersionInfo should return a valid Version Info'() {
        let vResponse = new VersionInfo();
        vResponse.DatabaseAvailable = true;
        (this._repo.HttpProviderRef as MockHttpProvider).AddResponse(vResponse);

        this._repo.GetVersionInfo().first().subscribe(result => {
            expect(result.DatabaseAvailable).to.be.eq(true);
        })
    }

    @test 'GetAllContentTypes should be return a valid content type collection'(done: MochaDone) {

        let cResponse = {
            d: {
                __count: 1,
                results: [
                    {
                        Name: 'testContentType',
                        Type: 'ContentType',
                        options: {},
                    }
                ]
            }
        } as ODataCollectionResponse<ContentType>;
        this._repo.HttpProviderRef.AddResponse(cResponse);
        this._repo.GetAllContentTypes().first().subscribe(types => {
            expect(types.length).to.be.eq(1);
            expect(types[0].Name).to.be.eq('testContentType');
            expect(types[0]).to.be.instanceof(ContentType);
            done();
        }, done)
    }

    @test 'Load should return a valid Content'(done: MochaDone) {
        let cResponse = {
            d: {
                Name: 'testContentType',
                Type: 'ContentType'
            }
        };
        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);
        this._repo.HttpProviderRef.AddResponse(cResponse);
        this._repo.Load(1).first().subscribe(response => {
            expect(response.Name).to.be.eq('testContentType');
            expect(response).to.be.instanceof(Content);
            done();
        }, err => {
            done(err);
        });
    }

    @test 'Load should return a valid Content with a valid type, if defined'(done: MochaDone) {
        let cResponse = {
            d: {
                Name: 'testContentType',
                Type: 'User',
            }
        };
        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);
        this._repo.HttpProviderRef.AddResponse(cResponse);
        this._repo.Load(1, {}, User).first().subscribe(response => {
            expect(response.Name).to.be.eq('testContentType');
            expect(response).to.be.instanceof(User);
            done();
        }, err => {
            done(err);
        });
    }

    @test 'SnRepository should have a default Config, if not provided'() {
        let snRepo = new SnRepository();
        expect(snRepo.Config.RepositoryUrl).to.be.eq(SnConfigModel.DEFAULT_BASE_URL);
    }

    @test 'SnRepository should respect the provided config'() {
        let snRepo = new SnRepository(new SnConfigModel({
            RepositoryUrl: 'https://demo.sensenet.com'
        }));
        expect(snRepo.Config.RepositoryUrl).to.be.eq('https://demo.sensenet.com');
    }

    @test 'HandleLoadedContent should respect content type from Options'() {
        let snRepo = new SnRepository(new SnConfigModel({
            RepositoryUrl: 'https://demo.sensenet.com'
        }));
        const task = snRepo.HandleLoadedContent({
            Id: 100,
            Path: 'Root/Test',
            Type: 'Task'
        })

        const usr = snRepo.HandleLoadedContent({
            Id: 200,
            Path: 'Root/Test',
            Name: 'User'
        }, User)

        const content = snRepo.HandleLoadedContent({
            Id: 300,
            Path: 'Root/Test',
            Name: ''
        })
        expect(task).to.be.instanceof(Task);

        expect(usr).to.be.instanceof(User);

        expect(content).to.be.instanceof(Content);
    }

    @test 'Content should return an ODataApi instance'() {
        let snRepo = new SnRepository();
        expect(snRepo.Content).to.be.instanceOf(ODataApi);
    }

    @test 'Should be able to create content using repository.CreateContent() '() {
        let snRepo = new SnRepository();
        let exampleTask = snRepo.CreateContent({}, Task);
        expect(exampleTask).to.be.instanceOf(Task);
    }


    @test 'DeleteBatch() should fire a DeleteBatch request'(done: MochaDone) {
        this._repo.HttpProviderRef.AddResponse({})
        const testContent = this._repo.HandleLoadedContent({ Id: 12345, Path: 'Root/Test' });
        this._repo.DeleteBatch([testContent]).subscribe(r => {
            expect(this._repo.HttpProviderRef.LastOptions.url).to.contains("https://localhost/odata.svc/('Root')/DeleteBatch");
            expect(this._repo.HttpProviderRef.LastOptions.body).to.be.eq('[{"paths":[12345]},{"permanently":false}]');
            expect(this._repo.HttpProviderRef.LastOptions.method).to.be.eq('POST');
            done();

        }, err => done(err));

    }


    @test 'DeleteBatch() should fire a DeleteBatch request by path'(done: MochaDone) {
        const testContentWithoutId = this._repo.HandleLoadedContent({ Path: 'Root/Test2' } as any);
        this._repo.HttpProviderRef.AddResponse({})
        this._repo.DeleteBatch([testContentWithoutId]).subscribe(res => {
            expect(this._repo.HttpProviderRef.LastOptions.url).to.contains("https://localhost/odata.svc/('Root')/DeleteBatch");
            expect(this._repo.HttpProviderRef.LastOptions.body).to.be.eq('[{"paths":["Root/Test2"]},{"permanently":false}]');
            expect(this._repo.HttpProviderRef.LastOptions.method).to.be.eq('POST');
            done();
        }, err => done(err));
    }

    @test 'DeleteBatch() should trigger ContentDeleted event after success'(done: MochaDone) {
        const testContent = this._repo.HandleLoadedContent({ Id: 12345, Path: 'Root/Test' });
        this._repo.Events.OnContentDeleted.subscribe(c => {
            expect(c.ContentData.Id).to.be.eq(testContent.Id);
            done();
        });
        this._repo.HttpProviderRef.AddResponse({});
        const action = this._repo.DeleteBatch([testContent]);
        expect(action).to.be.instanceof(Observable);
    }

    @test 'DeleteBatch() should trigger ContentDeleteFailed event after failure'(done: MochaDone) {
        const testContent = this._repo.HandleLoadedContent({ Id: 12345, Path: 'Root/Test' });
        this._repo.Events.OnContentDeleteFailed.subscribe(c => {
            expect(c.Content).to.be.eq(testContent);
            done();
        });
        this._repo.HttpProviderRef.AddError({ message: ':(' });
        const action = this._repo.DeleteBatch([testContent]);
        expect(action).to.be.instanceof(Observable);
    }

    @test 'MoveBatch() should fire a MoveBatch request'(done: MochaDone) {
        const testContent = this._repo.HandleLoadedContent({ Id: 12345, Path: 'Root/Test' });
        this._repo.HttpProviderRef.AddResponse({})
        this._repo.MoveBatch([testContent], 'Root/Test2').subscribe(r => {
            expect(this._repo.HttpProviderRef.LastOptions.url).to.contains("https://localhost/odata.svc/('Root')/MoveBatch");
            expect(this._repo.HttpProviderRef.LastOptions.body).to.be.eq('[{"paths":["Root/Test"],"targetPath":"Root/Test2"}]');
            expect(this._repo.HttpProviderRef.LastOptions.method).to.be.eq('POST');
            done();
        });
    }

    @test 'MoveBatch() should trigger ContentMoved event after success'(done: MochaDone) {
        const testContent = this._repo.HandleLoadedContent({ Id: 12345, Path: 'Root/Test' });
        const sourcePath = testContent.Path;

        this._repo.Events.OnContentMoved.subscribe(c => {
            expect(c.Content.Id).to.be.eq(testContent.Id);
            expect(c.From).to.be.eq(sourcePath);
            expect(c.To).to.be.eq('Root/Test2')
            done();
        });
        this._repo.HttpProviderRef.AddResponse({});
        const action = this._repo.MoveBatch([testContent], 'Root/Test2');
        expect(action).to.be.instanceof(Observable);
    }

    @test 'MoveBatch() should trigger ContentDeleteFailed event after failure'(done: MochaDone) {
        const testContent = this._repo.HandleLoadedContent({ Id: 12345, Path: 'Root/Test' });
        this._repo.Events.OnContentMoveFailed.subscribe(c => {
            expect(c.Content).to.be.eq(testContent);
            done();
        });
        this._repo.HttpProviderRef.AddError({ message: ':(' });
        const action = this._repo.MoveBatch([testContent], 'Root/Test2');
        expect(action).to.be.instanceof(Observable);
    }

    @test 'CopyBatch() should fire a CopyBatch request'(done: MochaDone) {
        const testContent = this._repo.HandleLoadedContent({ Id: 12345, Path: 'Root/Test' });
        this._repo.HttpProviderRef.AddResponse({});
        this._repo.CopyBatch([testContent], 'Root/Test2').subscribe(r => {
            expect(this._repo.HttpProviderRef.LastOptions.url).to.contains("https://localhost/odata.svc/('Root')/CopyBatch");
            expect(this._repo.HttpProviderRef.LastOptions.body).to.be.eq('[{"paths":["Root/Test"],"targetPath":"Root/Test2"}]');
            expect(this._repo.HttpProviderRef.LastOptions.method).to.be.eq('POST');
            done();
        }, err => done(err));
    }

    @test 'CopyBatch() should trigger ContentCreated event after success'(done: MochaDone) {
        const testContent = this._repo.HandleLoadedContent({ Id: 12345, Path: 'Root/Test' });
        this._repo.Events.OnContentCreated.subscribe(c => {
            expect(c.Content.Id).to.be.eq(testContent.Id);
            done();
        });
        this._repo.HttpProviderRef.AddResponse({});
        const action = this._repo.CopyBatch([testContent], 'Root/Test2');
        expect(action).to.be.instanceof(Observable);
    }

    @test 'CopyBatch() should trigger ContentCreateFailed event after failure'(done: MochaDone) {
        const testContent = this._repo.HandleLoadedContent({ Id: 12345, Path: 'Root/Test' });
        this._repo.Events.OnContentCreateFailed.subscribe(c => {
            expect(c.Content).to.be.eq(testContent);
            done();
        });
        this._repo.HttpProviderRef.AddError({ message: ':(' });
        const action = this._repo.CopyBatch([testContent], 'Root/Test2');
        expect(action).to.be.instanceof(Observable);
    }

    @test 'UploadResponse can be constructed'() {
        const model = new UploadResponse('123', 'chunkToken', true, true);
        expect(model).to.be.instanceof(UploadResponse);
    }

    @test 'Upload() should trigger UploadProgress event'(done: MochaDone) {
        this._repo.Config.ChunkSize = 1024 * 1024;
        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);

        const testContent = this._repo.HandleLoadedContent({ Id: 12345, Path: 'Root/Test' });
        this._repo.Events.OnUploadProgress.subscribe(pi => {
            expect(pi).to.be.instanceof(Object);
            done();
        }, err => done(err));
        this._repo.HttpProviderRef
            .AddResponse({ Id: 12356, Path: 'Root/Test/alma' })
            .AddResponse({ d: { Id: 12356, Path: 'Root/Test/alma' } });

        const mockFile = new File(['alma'], 'alma.txt');
        Object.assign((mockFile as any), {
            size: 8
        });


        testContent.UploadFile({ ContentType: Content, File: mockFile as File, PropertyName: 'Binary', Body: {}, Overwrite: true })
            .subscribe(progress => {

            }, err => done(err));
    }

    @test 'Upload() should trigger ContentCreated event'(done: MochaDone) {
        this._repo.Config.ChunkSize = 1024 * 1024;
        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);

        const testContent = this._repo.HandleLoadedContent({ Id: 12345, Path: 'Root/Test' });
        this._repo.Events.OnContentCreated.subscribe(pi => {
            expect(pi).to.be.instanceof(Object);
            done();
        }, err => done(err));
        this._repo.HttpProviderRef
            .AddResponse({ Id: 12356, Path: 'Root/Test/alma' })
            .AddResponse({ d: { Id: 12356, Path: 'Root/Test/alma' } });
        const mockFile = new File(['alma'], 'alma.txt');
        Object.assign((mockFile as any), {
            size: 8
        });


        testContent.UploadFile({ ContentType: Content, File: mockFile as File, PropertyName: 'Binary', Body: {}, Overwrite: true })
            .subscribe(progress => {

            }, err => done(err));
    }

    @test 'Upload() failure should trigger ContentCreateFailed event'(done: MochaDone) {
        this._repo.Config.ChunkSize = 1024 * 1024;
        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);
        this._repo.HttpProviderRef
            .AddError(Error('e'))
            .AddResponse({ d: { Id: 12356, Path: 'Root/Test/alma' } });


        const testContent = this._repo.HandleLoadedContent({ Id: 12345, Path: 'Root/Test' });
        this._repo.Events.OnUploadProgress.subscribe(pi => {
            done('This shouldn\'t be triggered');
        });
        this._repo.Events.OnContentCreateFailed.subscribe(failure => {
            done();
        })
        const mockFile = new File(['alma'], 'alma.txt');
        Object.assign((mockFile as any), {
            size: 8
        });


        testContent.UploadFile({ ContentType: Content, File: mockFile as File, PropertyName: 'Binary', Body: {}, Overwrite: true })
            .subscribe(progress => {

            });
    }

    @test 'Upload() chunked content should trigger multiple UploadProgress requests and resolves from Upload observable'(done: MochaDone) {
        this._repo.Config.ChunkSize = 4;
        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);
        this._repo.HttpProviderRef
            .AddResponse('9865*chunk-token*true*true')              // first upload
            .AddResponse({})                                        // Mocked chunks
            .AddResponse({})
            .AddResponse({})
            .AddResponse({ d: { Id: 12356, Path: 'Root/Test/alma' } })  // Content reload;


        const testContent = this._repo.HandleLoadedContent({ Id: 12345, Path: 'Root/Test' });
        let uploadReqCount = 0;

        this._repo.Events.OnUploadProgress.subscribe(pi => {
            uploadReqCount = pi.UploadedChunks;
        }, err => done(err), () => {
            expect(uploadReqCount).to.be.eq(3);
            done();
        });
        const mockFile = new File(['alma'], 'alma.txt');
        Object.assign((mockFile as any), {
            size: 12
        });


        testContent.UploadFile({ ContentType: Content, File: mockFile as File, PropertyName: 'Binary', Body: {}, Overwrite: true })
            .subscribe(progress => {
                if (progress.Completed) {
                    expect(progress.ChunkCount).to.be.eq(progress.UploadedChunks);
                    expect(uploadReqCount).to.be.eq(progress.ChunkCount);
                    done();
                }
            });
    }
    @test 'Upload() chunked content should trigger multiple UploadProgress requests and resolves from UploadProgress observable'(done: MochaDone) {
        this._repo.Config.ChunkSize = 4;
        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);
        this._repo.HttpProviderRef
            .AddResponse('9865*chunk-token*true*true')              // first upload
            .AddResponse({})                                        // Mocked chunks
            .AddResponse({})
            .AddResponse({})
            .AddResponse({ d: { Id: 12356, Path: 'Root/Test/alma' } })  // Content reload;


        const testContent = this._repo.HandleLoadedContent({ Id: 12345, Path: 'Root/Test' });

        this._repo.Events.OnUploadProgress.subscribe(progress => {
            if (progress.Completed) {
                expect(progress.ChunkCount).to.be.eq(progress.UploadedChunks);
                done();
            }
        }, err => done(err));
        const mockFile = new File(['alma'], 'alma.txt');
        Object.assign((mockFile as any), {
            size: 12
        });


        testContent.UploadFile({ ContentType: Content, File: mockFile as File, PropertyName: 'Binary', Body: {}, Overwrite: true })
            .subscribe(progress => {

            }, err => done(err));
    }

    @test 'UploadTextAsFile should trigger an Upload request'(done: MochaDone) {
        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);
        (this._repo as any)['UploadFile'] = (...args: any[]) => {
            done();
        }
        this._repo.UploadTextAsFile({
            Text: 'alma',
            ContentType: ContentTypes.File,
            Overwrite: true,
            Parent: this._repo.HandleLoadedContent({ Id: 12379846, Path: '/Root/Text', Name: 'asd' }),
            PropertyName: 'Binary',
            FileName: 'alma.txt'
        });
    }

    @test 'UploadFromDropEvent should trigger an Upload request w/o webkitRequestFileSystem'(done: MochaDone) {
        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);
        (this._repo as any)['UploadFile'] = (...args: any[]) => {
            done();
            return Observable.of([true]);
        }

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
            ContentType: ContentTypes.File,
            CreateFolders: false,
            PropertyName: 'Binary',
            Parent: this._repo.HandleLoadedContent({ Id: 12379846, Path: '/Root/Text', Name: 'asd' })
        });
    }

    @test 'UploadFromDropEvent should trigger an Upload request with webkitRequestFileSystem'(done: MochaDone) {
        this._repo.Authentication.StateSubject.next(LoginState.Authenticated);
        (this._repo as any)['UploadFile'] = (...args: any[]) => {
            done();
            return Observable.of([true]);
        }

        (global as any).window = { webkitRequestFileSystem: () => { } };
        const file = {
            isFile: true,
            file: (cb: (f: File) => void) => { cb(new File(['alma.txt'], 'alma')); }
        };
        this._repo.UploadFromDropEvent({
            Event: {
                dataTransfer: {
                    items: [
                        { webkitGetAsEntry: () => { return file } }
                    ]
                }
            } as any,
            Overwrite: true,
            ContentType: ContentTypes.File,
            CreateFolders: false,
            PropertyName: 'Binary',
            Parent: this._repo.HandleLoadedContent({ Id: 12379846, Path: '/Root/Text', Name: 'asd' })
        });
    }

    @test 'UploadFromDropEvent should upload a file and distribute proper status info'(done: MochaDone) {
        (this._repo as any)['UploadFile'] = (...args: any[]) => {
            return Observable.of({
                ChunkCount: 1,
                Completed: true,
                CreatedContent: { Id: 123456 },
                UploadedChunks: 1
            } as UploadProgressInfo<Content>);
        }

        (global as any).window = { webkitRequestFileSystem: () => { } };
        const file = {
            isFile: true,
            file: (cb: (f: File) => void) => { cb(new File(['alma.txt'], 'alma')); }
        };
        this._repo.UploadFromDropEvent({
            Event: {
                dataTransfer: {
                    items: [
                        { webkitGetAsEntry: () => { return file } }
                    ]
                }
            } as any,
            Overwrite: true,
            ContentType: ContentTypes.File,
            CreateFolders: false,
            PropertyName: 'Binary',
            Parent: this._repo.HandleLoadedContent({ Id: 12379846, Path: '/Root/Text', Name: 'asd' })
        }).then(result => {
            done();
        }).catch(err => done(err));
    }

    @test 'UploadFromDropEvent should distribute an error on upload failure'(done: MochaDone) {
        (this._repo as any)['UploadFile'] = (...args: any[]) => {
            const sub = new Subject();
            setTimeout(() => {
                sub.error('erroor');
            }, 10)
            return sub.asObservable;
        }

        (global as any).window = { webkitRequestFileSystem: () => { } };
        const file = {
            isFile: true,
            file: (cb: (f: File) => void) => { cb(new File(['alma.txt'], 'alma')); }
        };
        this._repo.UploadFromDropEvent({
            Event: {
                dataTransfer: {
                    items: [
                        { webkitGetAsEntry: () => { return file } }
                    ]
                }
            } as any,
            Overwrite: true,
            ContentType: ContentTypes.File,
            CreateFolders: false,
            PropertyName: 'Binary',
            Parent: this._repo.HandleLoadedContent({ Id: 12379846, Path: '/Root/Text', Name: 'asd' })
        }).then(result => {
            done('This shouldn\'t be called on error');
        }).catch(err => done());
    }

    @test 'UploadFromDropEvent should distribute an error on file read failure'(done: MochaDone) {
        (this._repo as any)['UploadFile'] = (...args: any[]) => {
            return Observable.of({
                ChunkCount: 1,
                Completed: true,
                CreatedContent: { Id: 123456 },
                UploadedChunks: 1
            } as UploadProgressInfo<Content>);
        }

        (global as any).window = { webkitRequestFileSystem: () => { } };
        const file = {
            isFile: true,
            file: (cb: (f: File) => void, err: (err: any) => void) => { err('File read fails here...') }
        };
        this._repo.UploadFromDropEvent({
            Event: {
                dataTransfer: {
                    items: [
                        { webkitGetAsEntry: () => { return file } }
                    ]
                }
            } as any,
            Overwrite: true,
            ContentType: ContentTypes.File,
            CreateFolders: false,
            PropertyName: 'Binary',
            Parent: this._repo.HandleLoadedContent({ Id: 12379846, Path: '/Root/Text', Name: 'asd' })
        }).then(result => {
            done('This shouldn\'t be called on error');
        }).catch(err => done());
    }

    @test 'UploadFromDropEvent should create Directories'(done: MochaDone) {

        (global as any).window = { webkitRequestFileSystem: () => { } };

        this._repo.HttpProviderRef.AddResponse({ d: { Id: 123456, Path: 'Root/Folder' } });


        (this._repo as any)['UploadFile'] = (...args: any[]) => {
            return Observable.of({
                ChunkCount: 1,
                Completed: true,
                CreatedContent: { Id: 123456 },
                UploadedChunks: 1
            } as UploadProgressInfo<Content>);
        }
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
                                file: (cb: (f: File) => void) => { cb(new File(['alma.txt'], 'alma')); }
                            }
                        ])
                    }
                }
            }
        };

        this._repo.UploadFromDropEvent({
            Event: {
                dataTransfer: {
                    items: [
                        { webkitGetAsEntry: () => { return directory } }
                    ]
                }
            } as any,
            Overwrite: true,
            ContentType: ContentTypes.File,
            CreateFolders: true,
            PropertyName: 'Binary',
            Parent: this._repo.HandleLoadedContent({ Id: 12379846, Path: '/Root/Text', Name: 'asd' })
        }).then(result => {
            done();
        }).catch(err => done(err));
    }

    @test 'UploadFromDropEvent should fail on error when creating a folder'(done: MochaDone) {

        (global as any).window = { webkitRequestFileSystem: () => { } };
        this._repo.HttpProviderRef.AddError('neeee');
        (this._repo as any)['UploadFile'] = (...args: any[]) => {
            return Observable.of({
                ChunkCount: 1,
                Completed: true,
                CreatedContent: { Id: 123456 },
                UploadedChunks: 1
            } as UploadProgressInfo<Content>);
        }
        const directory = {
            isFile: false,
            isDirectory: true,
        };

        this._repo.UploadFromDropEvent({
            Event: {
                dataTransfer: {
                    items: [
                        { webkitGetAsEntry: () => { return directory } }
                    ]
                }
            } as any,
            Overwrite: true,
            ContentType: ContentTypes.File,
            CreateFolders: true,
            PropertyName: 'Binary',
            Parent: this._repo.HandleLoadedContent({ Id: 12379846, Path: '/Root/Text', Name: 'asd' })
        }).then(result => {
            done('This shouldn\'t be triggered on error');
        }).catch(err => done());
    }

    @test 'GetCurrentUser() should return an Observable '() {
        let repo = new MockRepository();
        expect(repo.GetCurrentUser()).to.be.instanceof(Observable)
    }

    @test 'GetCurrentUser() should update with Visitor by default '(done: MochaDone) {
        let repo = new MockRepository();
        repo.GetCurrentUser().subscribe(u => {
            expect(u.Name).to.be.eq('Visitor');
            done();
        }, done)
    }

    @test 'GetCurrentUser() should update with the new User on change '(done: MochaDone) {
        let repo = new MockRepository();
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
        })
        repo.Authentication.CurrentUser = 'BuiltIn\\NewUser';
        repo.Authentication.StateSubject.next(LoginState.Pending);
        repo.Authentication.StateSubject.next(LoginState.Authenticated);
        repo.GetCurrentUser().subscribe(u => {
            expect(u.Name).to.be.eq('NewUser');
            done();
        }, done)
    }


    @test 'GetCurrentUser() should not update if multiple users found  on change '(done: MochaDone) {
        let repo = new MockRepository();
        repo.Authentication.StateSubject.next(LoginState.Pending);
        repo.Authentication.CurrentUser = 'BuiltIn\\NewUser';

        repo.GetCurrentUser().subscribe(u => {
            done('Error should be thrown here.');
        }, err => {
            expect(err).to.be.eq("Error getting current user: found multiple users with login name 'NewUser' in domain 'BuiltIn'")
            done()
        })

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

}