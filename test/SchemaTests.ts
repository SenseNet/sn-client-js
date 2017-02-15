///<reference path="../node_modules/@types/mocha/index.d.ts"/>
import { Schemas } from '../src/Schema';
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
                new FieldSettings.CurrencyFieldSetting({
                    name: 'DisplayName'
                }));
            schema.FieldSettings.push(
                new FieldSettings.HyperLinkFieldSetting({
                    name: 'DisplayName'
                }));
            schema.FieldSettings.push(
                new FieldSettings.ColorFieldSetting({
                    name: 'DisplayName'
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
    describe('#ContentViewCTD', function () {
        const cv = Schemas.ContentViewCTD();
        it('should return a schema object', function () {
            expect(cv).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#FileCTD', function () {
        const f = Schemas.FileCTD();
        it('should return a schema object', function () {
            expect(f).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ContractCTD', function () {
        const c = Schemas.ContractCTD();
        it('should return a schema object', function () {
            expect(c).to.be.an.instanceof(Schemas.Schema);
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
    describe('#FieldControlTemplateCTD', function () {
        const fct = Schemas.FieldControlTemplateCTD();
        it('should return a schema object', function () {
            expect(fct).to.be.an.instanceof(Schemas.Schema);
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
    describe('#OrderFormCTD', function () {
        const ctd = Schemas.OrderFormCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#SettingsCTD', function () {
        const ctd = Schemas.SettingsCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ADSettingsCTD', function () {
        const ctd = Schemas.ADSettingsCTD();
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
    describe('#MasterPageCTD', function () {
        const ctd = Schemas.MasterPageCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#PageTemplateCTD', function () {
        const ctd = Schemas.PageTemplateCTD();
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
    describe('#UserControlCTD', function () {
        const ctd = Schemas.UserControlCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ViewBaseCTD', function () {
        const ctd = Schemas.ViewBaseCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ListViewCTD', function () {
        const ctd = Schemas.ListViewCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#VideoCTD', function () {
        const ctd = Schemas.VideoCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#WorkflowDefinitionCTD', function () {
        const ctd = Schemas.WorkflowDefinitionCTD();
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
    describe('#ADFolderCTD', function () {
        const ctd = Schemas.ADFolderCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ArticleSectionCTD', function () {
        const ctd = Schemas.ArticleSectionCTD();
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
    describe('#EventListCTD', function () {
        const ctd = Schemas.EventListCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#FormCTD', function () {
        const ctd = Schemas.FormCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#EventRegistrationFormCTD', function () {
        const ctd = Schemas.EventRegistrationFormCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ForumTopicCTD', function () {
        const ctd = Schemas.ForumTopicCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#LinkListCTD', function () {
        const ctd = Schemas.LinkListCTD();
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
    describe('#SurveyCTD', function () {
        const ctd = Schemas.SurveyCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#VotingCTD', function () {
        const ctd = Schemas.VotingCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#SurveyListCTD', function () {
        const ctd = Schemas.SurveyListCTD();
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
    describe('#ContentViewsCTD', function () {
        const ctd = Schemas.ContentViewsCTD();
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
    describe('#DiscussionForumCTD', function () {
        const ctd = Schemas.DiscussionForumCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#DocumentWorkspaceFolderCTD', function () {
        const ctd = Schemas.DocumentWorkspaceFolderCTD();
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
    describe('#ExpenseClaimCTD', function () {
        const ctd = Schemas.ExpenseClaimCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#FieldControlTemplatesCTD', function () {
        const ctd = Schemas.FieldControlTemplatesCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#KPIDatasourceCTD', function () {
        const ctd = Schemas.KPIDatasourceCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#KPIDatasourcesCTD', function () {
        const ctd = Schemas.KPIDatasourcesCTD();
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
    describe('#OtherWorkspaceFolderCTD', function () {
        const ctd = Schemas.OtherWorkspaceFolderCTD();
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
    describe('#PortletCategoryCTD', function () {
        const ctd = Schemas.PortletCategoryCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#PostsCTD', function () {
        const ctd = Schemas.PostsCTD();
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
    describe('#ProjectWorkspaceFolderCTD', function () {
        const ctd = Schemas.ProjectWorkspaceFolderCTD();
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
    describe('#SalesWorkspaceFolderCTD', function () {
        const ctd = Schemas.SalesWorkspaceFolderCTD();
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
    describe('#ContentRotatorCTD', function () {
        const ctd = Schemas.ContentRotatorCTD();
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
    describe('#PortletsCTD', function () {
        const ctd = Schemas.PortletsCTD();
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
    describe('#SkinCTD', function () {
        const ctd = Schemas.SkinCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#SkinsCTD', function () {
        const ctd = Schemas.SkinsCTD();
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
    describe('#BlogCTD', function () {
        const ctd = Schemas.BlogCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#DocumentWorkspaceCTD', function () {
        const ctd = Schemas.DocumentWorkspaceCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ProjectWorkspaceCTD', function () {
        const ctd = Schemas.ProjectWorkspaceCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#SalesWorkspaceCTD', function () {
        const ctd = Schemas.SalesWorkspaceCTD();
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
    describe('#TeamWorkspaceCTD', function () {
        const ctd = Schemas.TeamWorkspaceCTD();
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
    describe('#WikiCTD', function () {
        const ctd = Schemas.WikiCTD();
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
    describe('#BlogPostCTD', function () {
        const ctd = Schemas.BlogPostCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#CalendarEventCTD', function () {
        const ctd = Schemas.CalendarEventCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#CarCTD', function () {
        const ctd = Schemas.CarCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#CommentCTD', function () {
        const ctd = Schemas.CommentCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ConfirmationItemCTD', function () {
        const ctd = Schemas.ConfirmationItemCTD();
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
    describe('#ExpenseClaimItemCTD', function () {
        const ctd = Schemas.ExpenseClaimItemCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#FormItemCTD', function () {
        const ctd = Schemas.FormItemCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#EventRegistrationFormItemCTD', function () {
        const ctd = Schemas.EventRegistrationFormItemCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ForumEntryCTD', function () {
        const ctd = Schemas.ForumEntryCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#LikeCTD', function () {
        const ctd = Schemas.LikeCTD();
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
    describe('#PortletCTD', function () {
        const ctd = Schemas.PortletCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#PostCTD', function () {
        const ctd = Schemas.PostCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#SliderItemCTD', function () {
        const ctd = Schemas.SliderItemCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#SurveyItemCTD', function () {
        const ctd = Schemas.SurveyItemCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#SurveyListItemCTD', function () {
        const ctd = Schemas.SurveyListItemCTD();
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
    describe('#ApprovalWorkflowTaskCTD', function () {
        const ctd = Schemas.ApprovalWorkflowTaskCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ExpenseClaimWorkflowTaskCTD', function () {
        const ctd = Schemas.ExpenseClaimWorkflowTaskCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#VotingItemCTD', function () {
        const ctd = Schemas.VotingItemCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#WebContentCTD', function () {
        const ctd = Schemas.WebContentCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#LinkCTD', function () {
        const ctd = Schemas.LinkCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#LinkCTD', function () {
        const ctd = Schemas.LinkCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#HTMLContentCTD', function () {
        const ctd = Schemas.HTMLContentCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#WebContentDemoCTD', function () {
        const ctd = Schemas.WebContentDemoCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#NotificationConfigCTD', function () {
        const ctd = Schemas.NotificationConfigCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#PublicRegistrationConfigCTD', function () {
        const ctd = Schemas.PublicRegistrationConfigCTD();
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
    describe('#SubscriptionCTD', function () {
        const ctd = Schemas.SubscriptionCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#TagCTD', function () {
        const ctd = Schemas.TagCTD();
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
    describe('#RegisteredUserCTD', function () {
        const ctd = Schemas.RegisteredUserCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#UserSearchCTD', function () {
        const ctd = Schemas.UserSearchCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#WikiArticleCTD', function () {
        const ctd = Schemas.WikiArticleCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#WorkflowCTD', function () {
        const ctd = Schemas.WorkflowCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ApprovalWorkflowCTD', function () {
        const ctd = Schemas.ApprovalWorkflowCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#DocumentPreviewWorkflowCTD', function () {
        const ctd = Schemas.DocumentPreviewWorkflowCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ExpenseClaimWorkflowCTD', function () {
        const ctd = Schemas.ExpenseClaimWorkflowCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#ForgottenPasswordWorkflowCTD', function () {
        const ctd = Schemas.ForgottenPasswordWorkflowCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#MailProcessorWorkflowCTD', function () {
        const ctd = Schemas.MailProcessorWorkflowCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
    describe('#RegistrationWorkflowCTD', function () {
        const ctd = Schemas.RegistrationWorkflowCTD();
        it('should return a schema object', function () {
            expect(ctd).to.be.an.instanceof(Schemas.Schema);
        });
    });
});