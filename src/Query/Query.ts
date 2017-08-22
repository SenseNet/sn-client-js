/**
 * @module Query
 * */ /** */

import { Content } from '../Content';
import { QuerySegment, QueryExpression, QueryResult } from '.';
import { BaseRepository } from '../Repository/BaseRepository';
import { IODataParams } from '../ODataApi';
import { Observable } from '@reactivex/rxjs';

/**
 * Represents an instance of a Query expression.
 * Usage example: 
 * ```ts
 * const query = new Query(q => q.TypeIs(ContentTypes.Task).And.Equals('DisplayName', 'Test'))
 * console.log(query.toString());   // the content query expression
 * ```
 */
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
     * Method that executes the Query and creates an OData request
     * @param {BaseRepository} repository The Repository instance
     * @param {string} path The Path for the query
     * @param {ODataParams} odataParams Additional OData parameters (like $select, $expand, etc...)
     * @returns {Observable<QueryResult<TReturns>>} An Observable that will publish the Query result
     */
    public Exec(repository: BaseRepository, path: string, odataParams: IODataParams<T> = {}): Observable<QueryResult<T>>{
        odataParams.query = this.toString();
        return repository.GetODataApi().Fetch({
                path,
                params: odataParams
            }, Content)
            .map(q => {
                return {
                    Result: q.d.results.map(c => repository.HandleLoadedContent<T, T['options']>(c as any)),
                    Count: q.d.__count
                }
            });
    }
}

/**
 * Represents a finialized Query instance that has a Repository, path and OData Parameters set up
 */
export class FinializedQuery<T extends Content = Content> extends Query<T>{
    constructor(build: (first: QueryExpression<Content>) => void, 
                        private readonly repository: BaseRepository, 
                        private readonly path: string, 
                        private readonly odataParams: IODataParams<T> = {}) {
        super(build);
    }

    /**
     * Executes the Query expression
     * Usage:
     * ```ts
     * const query = new Query(q => q.TypeIs(ContentTypes.Task).And.Equals('DisplayName', 'Test'))
     * query.Exec().subscribe(result=>{
     *  console.log(result);
     * })
     * ```
     */
    public Exec(): Observable<QueryResult<T>> {
        return super.Exec(this.repository, this.path, this.odataParams);
    }
}