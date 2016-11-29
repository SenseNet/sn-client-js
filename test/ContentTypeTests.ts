///<reference path="../node_modules/@types/mocha/index.d.ts"/>
import { ContentTypes, CreateContent } from '../src/ContentTypes';
import * as Chai from 'chai';
import * as sinon from 'sinon';
const expect = Chai.expect;

describe('ContentTypes', () => {
    describe('#GenericContent', function(){
        const gc = new ContentTypes.GenericContent({});
        it('should return a GenericContent type object', function(){
            expect(gc).to.be.an.instanceof(ContentTypes.GenericContent);
        });
    });
    describe('#Article', function(){
        const article = new ContentTypes.Article({});
        it('should return an Article type object', function(){
            expect(article).to.be.an.instanceof(ContentTypes.Article);
        });
    });
    describe('#Task', function(){
        const task = new ContentTypes.Task({});
        it('should return an Article type object', function(){
            expect(task).to.be.an.instanceof(ContentTypes.Task);
        });
    });
    describe('#CreateContent', function(){
        const content = CreateContent('Article');
        it('should return an Article type object', function(){
            expect(content).to.be.an.instanceof(ContentTypes.Article);
        });
    });
});