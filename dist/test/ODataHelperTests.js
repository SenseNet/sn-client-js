"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SN_1 = require("../src/SN");
const Chai = require("chai");
const expect = Chai.expect;
describe('ODataHelper', () => {
    describe('#IsItemPath()', function () {
        it('should return true if the given path is a path of an item', function () {
            const isAnItem = SN_1.ODataHelper.isItemPath("/workspace('project')");
            expect(isAnItem).to.be.true;
        });
        it('should return false if the given path is a path of a collection', function () {
            const isNotAnItem = SN_1.ODataHelper.isItemPath('/workspace');
            expect(isNotAnItem).to.be.false;
        });
    });
    describe('#getContentUrlbyId()', function () {
        it('should return a proper item path by the given id', function () {
            const contentUrl = SN_1.ODataHelper.getContentUrlbyId(1);
            expect(contentUrl).to.be.eq('/content(1)');
        });
    });
    describe('#getContentURLbyPath()', function () {
        it('should return a proper item path by the given path', function () {
            const contentUrl = SN_1.ODataHelper.getContentURLbyPath('/workspace/project');
            expect(contentUrl).to.be.eq("/workspace('project')");
        });
        it('should return the path itself if it is an item path already', function () {
            const contentUrl = SN_1.ODataHelper.getContentURLbyPath("/workspace('project')");
            expect(contentUrl).to.be.eq("/workspace('project')");
        });
        it('should return an error message if the given argument is an empty string', function () {
            try {
                SN_1.ODataHelper.getContentURLbyPath('');
            }
            catch (err) {
                expect(err).to.eql(new Error('This is not a valid path.'));
            }
        });
        it('should return a proper item path for Root only', () => {
            let path = SN_1.ODataHelper.getContentURLbyPath('/Root');
            expect(path).to.be.eq("/('Root')");
        });
    });
});
describe('#buildUrlParamString()', function () {
    it('should return an empty string, if the argument is undefined', function () {
        const urlParamString = SN_1.ODataHelper.buildUrlParamString();
        expect(urlParamString).to.be.eq('');
    });
    it("should return a string with only select Id and Type if there's no selected field", function () {
        const urlParamString = SN_1.ODataHelper.buildUrlParamString({ metadata: 'no' });
        expect(urlParamString).to.be.eq('?metadata=no&$select=Id,Type');
    });
    it('should return a string with the given field and Id and Type as selected', function () {
        const urlParamString = SN_1.ODataHelper.buildUrlParamString({ select: 'DisplayName' });
        expect(urlParamString).to.be.eq('?$select=DisplayName,Id,Type&metadata=no');
    });
    it('should return a string with the given fields and Id and Type as selected', function () {
        const urlParamString = SN_1.ODataHelper.buildUrlParamString({ select: ['DisplayName', 'Path'] });
        expect(urlParamString).to.be.eq('?$select=DisplayName,Path,Id,Type&metadata=no');
    });
    it('should return a string with the given parameters', function () {
        const urlParamString = SN_1.ODataHelper.buildUrlParamString({ select: ['DisplayName', 'Path'], orderby: 'DisplayName' });
        expect(urlParamString).to.be.eq('?$select=DisplayName,Path,Id,Type&$orderby=DisplayName&metadata=no');
    });
    it('should return a string with the given parameters', function () {
        const urlParamString = SN_1.ODataHelper.buildUrlParamString({ select: ['DisplayName', 'Path'], orderby: 'DisplayName', query: "isOf('Article')" });
        expect(urlParamString).to.be.eq("?$select=DisplayName,Path,Id,Type&$orderby=DisplayName&query=isOf('Article')&metadata=no");
    });
    it('should return a string without select param', function () {
        const urlParamString = SN_1.ODataHelper.buildUrlParamString({ select: 'all', orderby: 'DisplayName' });
        expect(urlParamString).to.be.eq('?$orderby=DisplayName&metadata=no');
    });
    it('should return a string without any param', function () {
        const urlParamString = SN_1.ODataHelper.buildUrlParamString();
        expect(urlParamString).to.be.eq('');
    });
});
describe('#buildRequestBody', function () {
    it('should return a stringified request body', function () {
        const body = SN_1.ODataHelper.buildRequestBody({ permanent: false, comment: 'aaa' });
        expect(body).to.be.eq('models=[{"permanent":false,"comment":"aaa"}]');
    });
});
//# sourceMappingURL=ODataHelperTests.js.map