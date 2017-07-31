import { Content } from '../Content';
import { QuerySegment, QueryExpression, QueryResult } from '.';
import { BaseRepository } from '../Repository/BaseRepository';
import { ODataRequestOptions, ODataParams } from '../ODataApi';
import { Observable } from '@reactivex/rxjs';

export class Query<T extends Content = Content>{
    private readonly segments: QuerySegment<T>[] = [];
    
    /**
     * Appends a new QuerySegment to the existing Query
     * @param {QuerySegment<T>} newSegment The Segment to be added
     */
    public addSegment(newSegment: QuerySegment<T> ) {
        this.segments.push(newSegment);
    }

    /**
     * @returns {String} The Query expression as a sensenet Content Query
     */
    public toString(): string{
        return this.segments.map(s => s.toString()).join('');
    }

    constructor(build: (first: QueryExpression<T>) => void) {
        const firstExpression = new QueryExpression<T>(this);
        build(firstExpression);
    }

    /**
     * Factory method for creating Query instances
     * @param {QueryExpression<Content>) => QuerySegment<T>} build The Build method
     * @returns {Query<T>} The constructed Query instance
     */
    public static Create<T extends Content = Content>(build: (first: QueryExpression<Content>) => QuerySegment<T>): Query<T> {
        return new Query<T>(build);
    }

    /**
     * Method to create and execute a Query expression
     * @param {(first: QueryExpression<Content>) => QuerySegment<TReturns>} build The Query builder method
     * @param {BaseRepository} repository The Repository instance
     * @param {string} path The Path for the query
     * @param {ODataParams} params Additional OData parameters (like $select, $expand, etc...)
     * @returns {Observable<QueryResult<TReturns>>} An Observable that will publish the Query result
     */
    public static Exec<TReturns extends Content>(build: (first: QueryExpression<Content>) => QuerySegment<TReturns>, 
            repository: BaseRepository, 
            path: string,
            params: ODataParams = {}
        ): Observable<QueryResult<TReturns>>{

        params.query = Query.Create(build).toString();
        return repository.GetODataApi().Fetch(new ODataRequestOptions({
            path,
            params
        }), Content)
        .map(q => {
            return {
                Result: q.d.results.map(c => repository.HandleLoadedContent<TReturns, TReturns['options']>(c)),
                Count: q.d.__count
            }
        });
    }
}
