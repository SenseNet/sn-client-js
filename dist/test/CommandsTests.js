"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../src_commands/utils");
const snconfig_1 = require("../src_commands/utils/snconfig");
const Path = require("path");
const Chai = require("chai");
const expect = Chai.expect;
describe('Commands', () => {
    describe('Utils', () => {
        describe('Ask', () => {
            describe('#TextAsync(question)', () => {
                it('should return an awaitable Promise', () => {
                    let promise = utils_1.Ask.TextAsync('Question');
                    expect(promise).to.be.an.instanceOf(Promise);
                });
            });
            describe('#PasswordAsync(question)', () => {
                it('should return an awaitable Promise', () => {
                    let promise = utils_1.Ask.PasswordAsync('Question');
                    expect(promise).to.be.an.instanceOf(Promise);
                });
            });
            describe('#MissingConfigs(...configs)', () => {
                it('should return an awaitable Promise', () => {
                    let promise = utils_1.Ask.MissingConfigs('UserName');
                    expect(promise).to.be.an.instanceOf(Promise);
                });
            });
        });
        describe('Download', () => {
            let download;
            beforeEach(() => {
                download = new utils_1.Download('demo.sensenet.com', 'index.html');
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
            let pathHelper;
            beforeEach(() => {
                pathHelper = new utils_1.PathHelper('c:/temp/package/../package', 'c:/temp/package/../package/node_modules/sn-client-js');
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
            let stage;
            let pathHelper;
            beforeEach(() => {
                pathHelper = new utils_1.PathHelper('c:/temp/snclienttest', 'c:/temp/snclienttest/node_modules/sn-client-js');
                stage = new utils_1.Stage(pathHelper);
            });
            it('Should have a proper temp folder name', () => {
                expect(stage.TempFolderName).to.be.eq('tmp');
            });
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
                    let fieldModel = new snconfig_1.SnConfigFieldModel();
                    expect(fieldModel.Behavior).to.be.eq(snconfig_1.SnConfigBehavior.Default);
                });
            });
            describe('SnConfigModelStore', () => {
                it('Should throw error if entity isn\'t in the store ', () => {
                    let find = () => { snconfig_1.SnConfigFieldModelStore.Get('exampleFieldName'); };
                    expect(find).to.throw(Error);
                });
                it('Should throw an error if you try to add a field that already exists', () => {
                    let add = () => { snconfig_1.SnConfigFieldModelStore.Add({ FieldName: 'Example', Question: 'ExampleQuestion', Behavior: snconfig_1.SnConfigBehavior.Default }); };
                    add();
                    expect(add).to.throw(Error);
                });
            });
            describe('SnConfiReader', () => {
                let reader;
                beforeEach(() => {
                    reader = new snconfig_1.SnConfigReader(process.cwd());
                });
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
                    it('Shouldn resolve when all fields are provided', () => __awaiter(this, void 0, void 0, function* () {
                        reader.Config = {
                            RepositoryUrl: 'url',
                            UserName: 'username',
                            Password: 'password'
                        };
                        let cfg = yield reader.ValidateAsync('RepositoryUrl');
                        expect(cfg.RepositoryUrl).to.be.eq('url');
                    }));
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
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=CommandsTests.js.map