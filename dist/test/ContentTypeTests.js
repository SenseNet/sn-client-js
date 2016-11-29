"use strict";
const ContentTypes_1 = require('../src/ContentTypes');
const Chai = require('chai');
const expect = Chai.expect;
describe('ContentTypes', () => {
    describe('#GenericContent', function () {
        const gc = new ContentTypes_1.ContentTypes.GenericContent({});
        it('should return a GenericContent type object', function () {
            expect(gc).to.be.an.instanceof(ContentTypes_1.ContentTypes.GenericContent);
        });
    });
    describe('#Article', function () {
        const article = new ContentTypes_1.ContentTypes.Article({});
        it('should return an Article type object', function () {
            expect(article).to.be.an.instanceof(ContentTypes_1.ContentTypes.Article);
        });
    });
    describe('#Task', function () {
        const task = new ContentTypes_1.ContentTypes.Task({});
        it('should return an Article type object', function () {
            expect(task).to.be.an.instanceof(ContentTypes_1.ContentTypes.Task);
        });
    });
    describe('#CreateContent', function () {
        const content = ContentTypes_1.CreateContent('Article');
        it('should return an Article type object', function () {
            expect(content).to.be.an.instanceof(ContentTypes_1.ContentTypes.Article);
        });
    });
});

//# sourceMappingURL=ContentTypeTests.js.map
