import { Schemas } from '../src/Schemas';
import { FieldSettings } from '../src/FieldSettings';
import * as Chai from 'chai';
import * as sinon from 'sinon';
const expect = Chai.expect;

describe('Schemas', () => {
    describe('#Schema', function () {
        let schema = new Schemas.Schema({ FieldSettings: [] });
        it('should return a schema object', function () {
            schema.FieldSettings.push(
                new FieldSettings.NumberFieldSetting({
                    name: 'DisplayName'
                }));
            schema.FieldSettings.push(
                new FieldSettings.BinaryFieldSetting({
                    name: 'DisplayName'
                }));
            schema.FieldSettings.push(
                new FieldSettings.ChoiceFieldSetting({
                    name: 'aaa',
                    options: []
                }));
            schema.FieldSettings.push(
                new FieldSettings.PasswordFieldSetting({
                    name: 'DisplayName'
                }));
            expect(schema).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#GenericContent', function () {
        const gc = Schemas.GenericContentCTD();
        it('should return a schema object', function () {
            expect(gc).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ContentTypeCTD', function () {
        const ct = Schemas.ContentTypeCTD();
        it('should return a schema object', function () {
            expect(ct).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ContentLinkCTD', function () {
        const cl = Schemas.ContentLinkCTD();
        it('should return a schema object', function () {
            expect(cl).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#FileCTD', function () {
        const f = Schemas.FileCTD();
        it('should return a schema object', function () {
            expect(f).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#DynamicJsonContentCTD', function () {
        const djc = Schemas.DynamicJsonContentCTD();
        it('should return a schema object', function () {
            expect(djc).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ExecutableFileCTD', function () {
        const ef = Schemas.ExecutableFileCTD();
        it('should return a schema object', function () {
            expect(ef).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#HtmlTemplateCTD', function () {
        const ht = Schemas.HtmlTemplateCTD();
        it('should return a schema object', function () {
            expect(ht).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ImageCTD', function () {
        const i = Schemas.ImageCTD();
        it('should return a schema object', function () {
            expect(i).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#PreviewImageCTD', function () {
        const pi = Schemas.PreviewImageCTD();
        it('should return a schema object', function () {
            expect(pi).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#SettingsCTD', function () {
        const ctd = Schemas.SettingsCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#IndexingSettingsCTD', function () {
        const ctd = Schemas.IndexingSettingsCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#LoggingSettingsCTD', function () {
        const ctd = Schemas.LoggingSettingsCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#PortalSettingsCTD', function () {
        const ctd = Schemas.PortalSettingsCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#SystemFileCTD', function () {
        const ctd = Schemas.SystemFileCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ResourceCTD', function () {
        const ctd = Schemas.ResourceCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#FolderCTD', function () {
        const ctd = Schemas.FolderCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ContentListCTD', function () {
        const ctd = Schemas.ContentListCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#AspectCTD', function () {
        const ctd = Schemas.AspectCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ItemListCTD', function () {
        const ctd = Schemas.ItemListCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#CustomListCTD', function () {
        const ctd = Schemas.CustomListCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#MemoListCTD', function () {
        const ctd = Schemas.MemoListCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#TaskListCTD', function () {
        const ctd = Schemas.TaskListCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#LibraryCTD', function () {
        const ctd = Schemas.LibraryCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#DocumentLibraryCTD', function () {
        const ctd = Schemas.DocumentLibraryCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ImageLibraryCTD', function () {
        const ctd = Schemas.ImageLibraryCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#DeviceCTD', function () {
        const ctd = Schemas.DeviceCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#DomainCTD', function () {
        const ctd = Schemas.DomainCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#DomainsCTD', function () {
        const ctd = Schemas.DomainsCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#EmailCTD', function () {
        const ctd = Schemas.EmailCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#OrganizationalUnitCTD', function () {
        const ctd = Schemas.OrganizationalUnitCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#PortalRootCTD', function () {
        const ctd = Schemas.PortalRootCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ProfileDomainCTD', function () {
        const ctd = Schemas.ProfileDomainCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ProfilesCTD', function () {
        const ctd = Schemas.ProfilesCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });

    describe('#RuntimeContentContainerCTD', function () {
        const ctd = Schemas.RuntimeContentContainerCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#SitesCTD', function () {
        const ctd = Schemas.SitesCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#SmartFolderCTD', function () {
        const ctd = Schemas.SmartFolderCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#SystemFolderCTD', function () {
        const ctd = Schemas.SystemFolderCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ResourcesCTD', function () {
        const ctd = Schemas.ResourcesCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#TrashBagCTD', function () {
        const ctd = Schemas.TrashBagCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#WorkspaceCTD', function () {
        const ctd = Schemas.WorkspaceCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#SiteCTD', function () {
        const ctd = Schemas.SiteCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#TrashBinCTD', function () {
        const ctd = Schemas.TrashBinCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#UserProfileCTD', function () {
        const ctd = Schemas.UserProfileCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#GroupCTD', function () {
        const ctd = Schemas.GroupCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ListItemCTD', function () {
        const ctd = Schemas.ListItemCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#CustomListItemCTD', function () {
        const ctd = Schemas.CustomListItemCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#MemoCTD', function () {
        const ctd = Schemas.MemoCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#TaskCTD', function () {
        const ctd = Schemas.TaskCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#QueryCTD', function () {
        const ctd = Schemas.QueryCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#UserCTD', function () {
        const ctd = Schemas.UserCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
});