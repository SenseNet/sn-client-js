"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SN_1 = require("../src/SN");
const Chai = require("chai");
const expect = Chai.expect;
describe('Schemas', () => {
    describe('#Schema', function () {
        let schema = new SN_1.Schemas.Schema({ FieldSettings: [] });
        it('should return a schema object', function () {
            schema.FieldSettings.push(new SN_1.FieldSettings.NumberFieldSetting({
                name: 'DisplayName'
            }));
            schema.FieldSettings.push(new SN_1.FieldSettings.BinaryFieldSetting({
                name: 'DisplayName'
            }));
            schema.FieldSettings.push(new SN_1.FieldSettings.ChoiceFieldSetting({
                name: 'aaa',
                options: []
            }));
            schema.FieldSettings.push(new SN_1.FieldSettings.PasswordFieldSetting({
                name: 'DisplayName'
            }));
            expect(schema).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#GenericContent', function () {
        const gc = SN_1.Schemas.GenericContentCTD();
        it('should return a schema object', function () {
            expect(gc).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#ContentTypeCTD', function () {
        const ct = SN_1.Schemas.ContentTypeCTD();
        it('should return a schema object', function () {
            expect(ct).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#ContentLinkCTD', function () {
        const cl = SN_1.Schemas.ContentLinkCTD();
        it('should return a schema object', function () {
            expect(cl).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#FileCTD', function () {
        const f = SN_1.Schemas.FileCTD();
        it('should return a schema object', function () {
            expect(f).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#DynamicJsonContentCTD', function () {
        const djc = SN_1.Schemas.DynamicJsonContentCTD();
        it('should return a schema object', function () {
            expect(djc).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#ExecutableFileCTD', function () {
        const ef = SN_1.Schemas.ExecutableFileCTD();
        it('should return a schema object', function () {
            expect(ef).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#HtmlTemplateCTD', function () {
        const ht = SN_1.Schemas.HtmlTemplateCTD();
        it('should return a schema object', function () {
            expect(ht).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#ImageCTD', function () {
        const i = SN_1.Schemas.ImageCTD();
        it('should return a schema object', function () {
            expect(i).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#PreviewImageCTD', function () {
        const pi = SN_1.Schemas.PreviewImageCTD();
        it('should return a schema object', function () {
            expect(pi).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#SettingsCTD', function () {
        const ctd = SN_1.Schemas.SettingsCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#IndexingSettingsCTD', function () {
        const ctd = SN_1.Schemas.IndexingSettingsCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#LoggingSettingsCTD', function () {
        const ctd = SN_1.Schemas.LoggingSettingsCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#PortalSettingsCTD', function () {
        const ctd = SN_1.Schemas.PortalSettingsCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#SystemFileCTD', function () {
        const ctd = SN_1.Schemas.SystemFileCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#ResourceCTD', function () {
        const ctd = SN_1.Schemas.ResourceCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#FolderCTD', function () {
        const ctd = SN_1.Schemas.FolderCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#ContentListCTD', function () {
        const ctd = SN_1.Schemas.ContentListCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#AspectCTD', function () {
        const ctd = SN_1.Schemas.AspectCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#ItemListCTD', function () {
        const ctd = SN_1.Schemas.ItemListCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#CustomListCTD', function () {
        const ctd = SN_1.Schemas.CustomListCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#MemoListCTD', function () {
        const ctd = SN_1.Schemas.MemoListCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#TaskListCTD', function () {
        const ctd = SN_1.Schemas.TaskListCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#LibraryCTD', function () {
        const ctd = SN_1.Schemas.LibraryCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#DocumentLibraryCTD', function () {
        const ctd = SN_1.Schemas.DocumentLibraryCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#ImageLibraryCTD', function () {
        const ctd = SN_1.Schemas.ImageLibraryCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#DeviceCTD', function () {
        const ctd = SN_1.Schemas.DeviceCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#DomainCTD', function () {
        const ctd = SN_1.Schemas.DomainCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#DomainsCTD', function () {
        const ctd = SN_1.Schemas.DomainsCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#EmailCTD', function () {
        const ctd = SN_1.Schemas.EmailCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#OrganizationalUnitCTD', function () {
        const ctd = SN_1.Schemas.OrganizationalUnitCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#PortalRootCTD', function () {
        const ctd = SN_1.Schemas.PortalRootCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#ProfileDomainCTD', function () {
        const ctd = SN_1.Schemas.ProfileDomainCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#ProfilesCTD', function () {
        const ctd = SN_1.Schemas.ProfilesCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#RuntimeContentContainerCTD', function () {
        const ctd = SN_1.Schemas.RuntimeContentContainerCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#SitesCTD', function () {
        const ctd = SN_1.Schemas.SitesCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#SmartFolderCTD', function () {
        const ctd = SN_1.Schemas.SmartFolderCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#SystemFolderCTD', function () {
        const ctd = SN_1.Schemas.SystemFolderCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#ResourcesCTD', function () {
        const ctd = SN_1.Schemas.ResourcesCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#TrashBagCTD', function () {
        const ctd = SN_1.Schemas.TrashBagCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#WorkspaceCTD', function () {
        const ctd = SN_1.Schemas.WorkspaceCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#SiteCTD', function () {
        const ctd = SN_1.Schemas.SiteCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#TrashBinCTD', function () {
        const ctd = SN_1.Schemas.TrashBinCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#UserProfileCTD', function () {
        const ctd = SN_1.Schemas.UserProfileCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#GroupCTD', function () {
        const ctd = SN_1.Schemas.GroupCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#ListItemCTD', function () {
        const ctd = SN_1.Schemas.ListItemCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#CustomListItemCTD', function () {
        const ctd = SN_1.Schemas.CustomListItemCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#MemoCTD', function () {
        const ctd = SN_1.Schemas.MemoCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#TaskCTD', function () {
        const ctd = SN_1.Schemas.TaskCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#QueryCTD', function () {
        const ctd = SN_1.Schemas.QueryCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
    describe('#UserCTD', function () {
        const ctd = SN_1.Schemas.UserCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(SN_1.Schemas.Schema);
        });
    });
});
//# sourceMappingURL=SchemaTests.js.map