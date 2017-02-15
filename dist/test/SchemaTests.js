"use strict";
const Schema_1 = require('../src/Schema');
const FieldSettings_1 = require('../src/FieldSettings');
const Chai = require('chai');
const expect = Chai.expect;
describe('Schemas', () => {
    describe('#Schema', function () {
        let schema = new Schema_1.Schemas.Schema({ FieldSettings: [] });
        it('should return a schema object', function () {
            schema.FieldSettings.push(new FieldSettings_1.FieldSettings.NumberFieldSetting({
                name: 'DisplayName'
            }));
            schema.FieldSettings.push(new FieldSettings_1.FieldSettings.BinaryFieldSetting({
                name: 'DisplayName'
            }));
            schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ChoiceFieldSetting({
                name: 'aaa',
                options: []
            }));
            schema.FieldSettings.push(new FieldSettings_1.FieldSettings.CurrencyFieldSetting({
                name: 'DisplayName'
            }));
            schema.FieldSettings.push(new FieldSettings_1.FieldSettings.HyperLinkFieldSetting({
                name: 'DisplayName'
            }));
            schema.FieldSettings.push(new FieldSettings_1.FieldSettings.ColorFieldSetting({
                name: 'DisplayName'
            }));
            schema.FieldSettings.push(new FieldSettings_1.FieldSettings.PasswordFieldSetting({
                name: 'DisplayName'
            }));
            expect(schema).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#GenericContent', function () {
        const gc = Schema_1.Schemas.GenericContentCTD();
        it('should return a schema object', function () {
            expect(gc).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ContentTypeCTD', function () {
        const ct = Schema_1.Schemas.ContentTypeCTD();
        it('should return a schema object', function () {
            expect(ct).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ContentLinkCTD', function () {
        const cl = Schema_1.Schemas.ContentLinkCTD();
        it('should return a schema object', function () {
            expect(cl).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ContentViewCTD', function () {
        const cv = Schema_1.Schemas.ContentViewCTD();
        it('should return a schema object', function () {
            expect(cv).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#FileCTD', function () {
        const f = Schema_1.Schemas.FileCTD();
        it('should return a schema object', function () {
            expect(f).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ContractCTD', function () {
        const c = Schema_1.Schemas.ContractCTD();
        it('should return a schema object', function () {
            expect(c).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#DynamicJsonContentCTD', function () {
        const djc = Schema_1.Schemas.DynamicJsonContentCTD();
        it('should return a schema object', function () {
            expect(djc).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ExecutableFileCTD', function () {
        const ef = Schema_1.Schemas.ExecutableFileCTD();
        it('should return a schema object', function () {
            expect(ef).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#FieldControlTemplateCTD', function () {
        const fct = Schema_1.Schemas.FieldControlTemplateCTD();
        it('should return a schema object', function () {
            expect(fct).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#HtmlTemplateCTD', function () {
        const ht = Schema_1.Schemas.HtmlTemplateCTD();
        it('should return a schema object', function () {
            expect(ht).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ImageCTD', function () {
        const i = Schema_1.Schemas.ImageCTD();
        it('should return a schema object', function () {
            expect(i).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#PreviewImageCTD', function () {
        const pi = Schema_1.Schemas.PreviewImageCTD();
        it('should return a schema object', function () {
            expect(pi).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#OrderFormCTD', function () {
        const ctd = Schema_1.Schemas.OrderFormCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#SettingsCTD', function () {
        const ctd = Schema_1.Schemas.SettingsCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ADSettingsCTD', function () {
        const ctd = Schema_1.Schemas.ADSettingsCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#IndexingSettingsCTD', function () {
        const ctd = Schema_1.Schemas.IndexingSettingsCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#LoggingSettingsCTD', function () {
        const ctd = Schema_1.Schemas.LoggingSettingsCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#PortalSettingsCTD', function () {
        const ctd = Schema_1.Schemas.PortalSettingsCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#SystemFileCTD', function () {
        const ctd = Schema_1.Schemas.SystemFileCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#MasterPageCTD', function () {
        const ctd = Schema_1.Schemas.MasterPageCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#PageTemplateCTD', function () {
        const ctd = Schema_1.Schemas.PageTemplateCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ResourceCTD', function () {
        const ctd = Schema_1.Schemas.ResourceCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#UserControlCTD', function () {
        const ctd = Schema_1.Schemas.UserControlCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ViewBaseCTD', function () {
        const ctd = Schema_1.Schemas.ViewBaseCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ListViewCTD', function () {
        const ctd = Schema_1.Schemas.ListViewCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#VideoCTD', function () {
        const ctd = Schema_1.Schemas.VideoCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#WorkflowDefinitionCTD', function () {
        const ctd = Schema_1.Schemas.WorkflowDefinitionCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#FolderCTD', function () {
        const ctd = Schema_1.Schemas.FolderCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ADFolderCTD', function () {
        const ctd = Schema_1.Schemas.ADFolderCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ArticleSectionCTD', function () {
        const ctd = Schema_1.Schemas.ArticleSectionCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ContentListCTD', function () {
        const ctd = Schema_1.Schemas.ContentListCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#AspectCTD', function () {
        const ctd = Schema_1.Schemas.AspectCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ItemListCTD', function () {
        const ctd = Schema_1.Schemas.ItemListCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#CustomListCTD', function () {
        const ctd = Schema_1.Schemas.CustomListCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#EventListCTD', function () {
        const ctd = Schema_1.Schemas.EventListCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#FormCTD', function () {
        const ctd = Schema_1.Schemas.FormCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#EventRegistrationFormCTD', function () {
        const ctd = Schema_1.Schemas.EventRegistrationFormCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ForumTopicCTD', function () {
        const ctd = Schema_1.Schemas.ForumTopicCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#LinkListCTD', function () {
        const ctd = Schema_1.Schemas.LinkListCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#MemoListCTD', function () {
        const ctd = Schema_1.Schemas.MemoListCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#SurveyCTD', function () {
        const ctd = Schema_1.Schemas.SurveyCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#VotingCTD', function () {
        const ctd = Schema_1.Schemas.VotingCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#SurveyListCTD', function () {
        const ctd = Schema_1.Schemas.SurveyListCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#TaskListCTD', function () {
        const ctd = Schema_1.Schemas.TaskListCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#LibraryCTD', function () {
        const ctd = Schema_1.Schemas.LibraryCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#DocumentLibraryCTD', function () {
        const ctd = Schema_1.Schemas.DocumentLibraryCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ImageLibraryCTD', function () {
        const ctd = Schema_1.Schemas.ImageLibraryCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ContentViewsCTD', function () {
        const ctd = Schema_1.Schemas.ContentViewsCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#DeviceCTD', function () {
        const ctd = Schema_1.Schemas.DeviceCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#DiscussionForumCTD', function () {
        const ctd = Schema_1.Schemas.DiscussionForumCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#DocumentWorkspaceFolderCTD', function () {
        const ctd = Schema_1.Schemas.DocumentWorkspaceFolderCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#DomainCTD', function () {
        const ctd = Schema_1.Schemas.DomainCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#DomainsCTD', function () {
        const ctd = Schema_1.Schemas.DomainsCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#EmailCTD', function () {
        const ctd = Schema_1.Schemas.EmailCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ExpenseClaimCTD', function () {
        const ctd = Schema_1.Schemas.ExpenseClaimCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#FieldControlTemplatesCTD', function () {
        const ctd = Schema_1.Schemas.FieldControlTemplatesCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#KPIDatasourceCTD', function () {
        const ctd = Schema_1.Schemas.KPIDatasourceCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#KPIDatasourcesCTD', function () {
        const ctd = Schema_1.Schemas.KPIDatasourcesCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#OrganizationalUnitCTD', function () {
        const ctd = Schema_1.Schemas.OrganizationalUnitCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#OtherWorkspaceFolderCTD', function () {
        const ctd = Schema_1.Schemas.OtherWorkspaceFolderCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#PortalRootCTD', function () {
        const ctd = Schema_1.Schemas.PortalRootCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#PortletCategoryCTD', function () {
        const ctd = Schema_1.Schemas.PortletCategoryCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#PostsCTD', function () {
        const ctd = Schema_1.Schemas.PostsCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ProfileDomainCTD', function () {
        const ctd = Schema_1.Schemas.ProfileDomainCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ProfilesCTD', function () {
        const ctd = Schema_1.Schemas.ProfilesCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ProjectWorkspaceFolderCTD', function () {
        const ctd = Schema_1.Schemas.ProjectWorkspaceFolderCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#RuntimeContentContainerCTD', function () {
        const ctd = Schema_1.Schemas.RuntimeContentContainerCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#SalesWorkspaceFolderCTD', function () {
        const ctd = Schema_1.Schemas.SalesWorkspaceFolderCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#SitesCTD', function () {
        const ctd = Schema_1.Schemas.SitesCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#SmartFolderCTD', function () {
        const ctd = Schema_1.Schemas.SmartFolderCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ContentRotatorCTD', function () {
        const ctd = Schema_1.Schemas.ContentRotatorCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#SystemFolderCTD', function () {
        const ctd = Schema_1.Schemas.SystemFolderCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#PortletsCTD', function () {
        const ctd = Schema_1.Schemas.PortletsCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ResourcesCTD', function () {
        const ctd = Schema_1.Schemas.ResourcesCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#SkinCTD', function () {
        const ctd = Schema_1.Schemas.SkinCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#SkinsCTD', function () {
        const ctd = Schema_1.Schemas.SkinsCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#TrashBagCTD', function () {
        const ctd = Schema_1.Schemas.TrashBagCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#WorkspaceCTD', function () {
        const ctd = Schema_1.Schemas.WorkspaceCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#BlogCTD', function () {
        const ctd = Schema_1.Schemas.BlogCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#DocumentWorkspaceCTD', function () {
        const ctd = Schema_1.Schemas.DocumentWorkspaceCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ProjectWorkspaceCTD', function () {
        const ctd = Schema_1.Schemas.ProjectWorkspaceCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#SalesWorkspaceCTD', function () {
        const ctd = Schema_1.Schemas.SalesWorkspaceCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#SiteCTD', function () {
        const ctd = Schema_1.Schemas.SiteCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#TeamWorkspaceCTD', function () {
        const ctd = Schema_1.Schemas.TeamWorkspaceCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#TrashBinCTD', function () {
        const ctd = Schema_1.Schemas.TrashBinCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#UserProfileCTD', function () {
        const ctd = Schema_1.Schemas.UserProfileCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#WikiCTD', function () {
        const ctd = Schema_1.Schemas.WikiCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#GroupCTD', function () {
        const ctd = Schema_1.Schemas.GroupCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ListItemCTD', function () {
        const ctd = Schema_1.Schemas.ListItemCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#BlogPostCTD', function () {
        const ctd = Schema_1.Schemas.BlogPostCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#CalendarEventCTD', function () {
        const ctd = Schema_1.Schemas.CalendarEventCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#CarCTD', function () {
        const ctd = Schema_1.Schemas.CarCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#CommentCTD', function () {
        const ctd = Schema_1.Schemas.CommentCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ConfirmationItemCTD', function () {
        const ctd = Schema_1.Schemas.ConfirmationItemCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#CustomListItemCTD', function () {
        const ctd = Schema_1.Schemas.CustomListItemCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ExpenseClaimItemCTD', function () {
        const ctd = Schema_1.Schemas.ExpenseClaimItemCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#FormItemCTD', function () {
        const ctd = Schema_1.Schemas.FormItemCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#EventRegistrationFormItemCTD', function () {
        const ctd = Schema_1.Schemas.EventRegistrationFormItemCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ForumEntryCTD', function () {
        const ctd = Schema_1.Schemas.ForumEntryCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#LikeCTD', function () {
        const ctd = Schema_1.Schemas.LikeCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#MemoCTD', function () {
        const ctd = Schema_1.Schemas.MemoCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#PortletCTD', function () {
        const ctd = Schema_1.Schemas.PortletCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#PostCTD', function () {
        const ctd = Schema_1.Schemas.PostCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#SliderItemCTD', function () {
        const ctd = Schema_1.Schemas.SliderItemCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#SurveyItemCTD', function () {
        const ctd = Schema_1.Schemas.SurveyItemCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#SurveyListItemCTD', function () {
        const ctd = Schema_1.Schemas.SurveyListItemCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#TaskCTD', function () {
        const ctd = Schema_1.Schemas.TaskCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ApprovalWorkflowTaskCTD', function () {
        const ctd = Schema_1.Schemas.ApprovalWorkflowTaskCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ExpenseClaimWorkflowTaskCTD', function () {
        const ctd = Schema_1.Schemas.ExpenseClaimWorkflowTaskCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#VotingItemCTD', function () {
        const ctd = Schema_1.Schemas.VotingItemCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#WebContentCTD', function () {
        const ctd = Schema_1.Schemas.WebContentCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#LinkCTD', function () {
        const ctd = Schema_1.Schemas.LinkCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#LinkCTD', function () {
        const ctd = Schema_1.Schemas.LinkCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#HTMLContentCTD', function () {
        const ctd = Schema_1.Schemas.HTMLContentCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#WebContentDemoCTD', function () {
        const ctd = Schema_1.Schemas.WebContentDemoCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#NotificationConfigCTD', function () {
        const ctd = Schema_1.Schemas.NotificationConfigCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#PublicRegistrationConfigCTD', function () {
        const ctd = Schema_1.Schemas.PublicRegistrationConfigCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#QueryCTD', function () {
        const ctd = Schema_1.Schemas.QueryCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#SubscriptionCTD', function () {
        const ctd = Schema_1.Schemas.SubscriptionCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#TagCTD', function () {
        const ctd = Schema_1.Schemas.TagCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#UserCTD', function () {
        const ctd = Schema_1.Schemas.UserCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#RegisteredUserCTD', function () {
        const ctd = Schema_1.Schemas.RegisteredUserCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#UserSearchCTD', function () {
        const ctd = Schema_1.Schemas.UserSearchCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#WikiArticleCTD', function () {
        const ctd = Schema_1.Schemas.WikiArticleCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#WorkflowCTD', function () {
        const ctd = Schema_1.Schemas.WorkflowCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ApprovalWorkflowCTD', function () {
        const ctd = Schema_1.Schemas.ApprovalWorkflowCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#DocumentPreviewWorkflowCTD', function () {
        const ctd = Schema_1.Schemas.DocumentPreviewWorkflowCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ExpenseClaimWorkflowCTD', function () {
        const ctd = Schema_1.Schemas.ExpenseClaimWorkflowCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#ForgottenPasswordWorkflowCTD', function () {
        const ctd = Schema_1.Schemas.ForgottenPasswordWorkflowCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#MailProcessorWorkflowCTD', function () {
        const ctd = Schema_1.Schemas.MailProcessorWorkflowCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
    describe('#RegistrationWorkflowCTD', function () {
        const ctd = Schema_1.Schemas.RegistrationWorkflowCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schema_1.Schemas.Schema);
        });
    });
});

//# sourceMappingURL=SchemaTests.js.map
