/**
 * @module Query
 */ /** */

import { Observable } from '@reactivex/rxjs';
import { QueryExpression, QueryResult, QuerySegment } from '.';
import { IContent } from '../Content';
import { IODataParams } from '../ODataApi';
import { BaseRepository } from '../Repository/BaseRepository';

/**
 * Represents an instance of a Query expression.
 * Usage example:
 * ```ts
 * const query = new Query(q => q.TypeIs(ContentTypes.Task).And.Equals('DisplayName', 'Test'))
 * console.log(query.toString());   // the content query expression
 * ```
 */
export class Query<T extends IContent = IContent> {
    private readonly _segments: QuerySegment<T>[] = [];

    /**
     * Appends a new QuerySegment to the existing Query
     * @param {QuerySegment<T>} newSegment The Segment to be added
     */
    public AddSegment(newSegment: QuerySegment<T> ) {
        this._segments.push(newSegment);
    }

    /**
     * @returns {String} The Query expression as a sensenet Content Query
     */
    // tslint:disable-next-line:naming-convention
    public toString(): string {
        return this._segments.map((s) => s.toString()).join('');
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
    public Exec(repository: BaseRepository, path: string, odataParams: IODataParams<T> = {}): Observable<QueryResult<T>> {
        odataParams.query = this.toString();
        return repository.GetODataApi().Fetch<T>({
                path,
                params: odataParams
            })
            .map((q) => {
                return {
                    Result: q.d.results.map((c) => repository.HandleLoadedContent<T>(c)),
                    Count: q.d.__count
                };
            });
    }
}

/**
 * Represents a finialized Query instance that has a Repository, path and OData Parameters set up
 */
export class FinializedQuery<T extends IContent = IContent> extends Query<T> {
    constructor(build: (first: QueryExpression<IContent>) => void,
                private readonly _repository: BaseRepository,
                private readonly _path: string,
                private readonly _odataParams: IODataParams<T> = {}) {
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
        return super.Exec(this._repository, this._path, this._odataParams);
    }
}
