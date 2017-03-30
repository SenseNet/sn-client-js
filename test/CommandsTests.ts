import { Ask, Download, PathHelper, Stage } from '../src_commands/utils'
import { SnConfigFieldModel, SnConfigBehavior, SnConfigFieldModelStore, SnConfigReader, SnConfigModel } from '../src_commands/utils/snconfig';
import * as Path from 'path';

import * as Chai from 'chai';
const expect = Chai.expect;

describe('Commands', () => {
    describe('Utils', () => {
        describe('Ask', () => {
            describe('#TextAsync(question)', () => {
                it('should return an awaitable Promise', () => {
                    let promise = Ask.TextAsync('Question');
                    expect(promise).to.be.an.instanceOf(Promise);
                })
            });
            describe('#PasswordAsync(question)', () => {
                it('should return an awaitable Promise', () => {
                    let promise = Ask.PasswordAsync('Question');
                    expect(promise).to.be.an.instanceOf(Promise);
                })
            });
            describe('#MissingConfigs(...configs)', () => {
                it('should return an awaitable Promise', () => {
                    let promise = Ask.MissingConfigs('UserName');
                    expect(promise).to.be.an.instanceOf(Promise);
                })
            });
        })

        describe('Download', () => {
            let download: Download;
            beforeEach(() => {
                download = new Download('demo.sensenet.com', 'index.html');
            });
            it('Shouldn\'t have custom headers by default', () => {
                expect(Object.keys(download['headers']).length).to.be.eq(0);
            });
            it('Should have a proper base64 encoded Basic Authorization header after setting up Authenticate', () => {
                download.Authenticate('username', 'password');
                expect(download['headers']['Authorization']).to.be.eq('Basic dXNlcm5hbWU6cGFzc3dvcmQ=');
            });
            it('Should return the file as awaitable Promise on GetAsBufferAsync', () => {
                let buffer = download.GetAsBufferAsync();
                expect(buffer).to.be.an.instanceOf(Promise);
            });
        });

        describe('PathHelper', () => {
            let pathHelper: PathHelper;

            beforeEach(() => {
                pathHelper = new PathHelper('c:/temp/package/../package', 'c:/temp/package/../package/node_modules/sn-client-js');
            });

            it('Should normalize PackageRoot path', () => {
                expect(pathHelper.PackageRootPath).to.be.eq(`c:${Path.sep}temp${Path.sep}package`);
            });
            it('Should normalize SnClient path', () => {
                expect(pathHelper.SnClientPath).to.be.eq(`c:${Path.sep}temp${Path.sep}package${Path.sep}node_modules${Path.sep}sn-client-js`);
            });

            it('Should provide realible relative path to PackageRootPath', () => {
                expect(pathHelper.GetRelativeToPackageRootPath('./alma')).to.be.eq(Path.join(pathHelper.PackageRootPath, './alma'));
            });
            it('Should provide realible relative path to SnClientPath', () => {
                expect(pathHelper.GetRelativeToSnClientPath('./alma')).to.be.eq(Path.join(pathHelper.SnClientPath, './alma'));
            });
        });
        describe('stage', () => {
            let stage: Stage;
            let pathHelper: PathHelper;
            beforeEach(() => {
                pathHelper = new PathHelper('c:/temp/snclienttest', 'c:/temp/snclienttest/node_modules/sn-client-js');
                stage = new Stage(pathHelper);
            })
            it('Should have a proper temp folder path', () => {
                expect(stage.TempFolderPath).to.be.eq(Path.join(pathHelper.SnClientPath, 'tmp'));
            });
            describe('#PrepareAsync()', () => {
                it('Should return an awaitable promise', () => {
                    let promise = stage.PrepareAsync();
                    expect(promise).to.be.an.instanceOf(Promise);
                });
            });
            describe('#CompileAsync()', () => {
                it('Should return an awaitable promise', () => {
                    let promise = stage.CompileAsync();
                    expect(promise).to.be.an.instanceOf(Promise);
                });
            });
        });
        describe('SnConfig', () => {
            describe('SnConfigFieldModel', () => {
                it('Should be constructed with SnConfigBehavior.Default', () => {
                    let fieldModel = new SnConfigFieldModel();
                    expect(fieldModel.Behavior).to.be.eq(SnConfigBehavior.Default);
                })
            });

            describe('SnConfigModelStore', () => {
                it('Should throw error if entity isn\'t in the store ', () => {
                    let find = () => { SnConfigFieldModelStore.Get('exampleFieldName'); }
                    expect(find).to.throw(Error);
                });

                it('Should throw an error if you try to add a field that already exists', () => {
                    let add = () => { SnConfigFieldModelStore.Add({ FieldName: 'Example', Question: 'ExampleQuestion', Behavior: SnConfigBehavior.Default }); }
                    add();  // add once
                    expect(add).to.throw(Error);
                });
            });

            describe('SnConfiReader', () => {
                let reader: SnConfigReader;
                beforeEach(() => {
                    reader = new SnConfigReader(process.cwd());
                })

                describe('#ReadConfigFile()', () => {
                    it('should return an awaitable promise', () => {
                        let promise = reader.ReadConfigFile();
                        expect(promise).to.be.an.instanceOf(Promise);
                    });
                });
                describe('#ValidateAsync()', () => {
                    it('should return an awaitable promise', () => {
                        let promise = reader.ValidateAsync('RepositoryUrl', 'UserName', 'Password');
                        expect(promise).to.be.an.instanceOf(Promise);
                    });
                    it('Shouldn resolve when all fields are provided', async () => {
                        reader.Config = {
                            RepositoryUrl: 'url',
                            UserName: 'username',
                            Password: 'password'
                        }
                        let cfg = await reader.ValidateAsync('RepositoryUrl');
                        expect(cfg.RepositoryUrl).to.be.eq('url');
                    });
                    it('Should throw an error if a field is provided but disallowed form config by behavior', (done) => {
                        reader.Config = {
                            RepositoryUrl: '',
                            UserName: 'user',
                            Password: 'password'
                        };
                        reader.ValidateAsync('Password')
                            .then(() => {
                                done('Exception expcected');
                            })
                            .catch(() => done());
                    })
                });
            })
        })
    });
})