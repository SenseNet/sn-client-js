import { Content } from '../Content';
import { QuerySegment, QueryExpression, QueryResult } from '.';
import { BaseRepository } from '../Repository/BaseRepository';
import { ODataRequestOptions, ODataParams } from '../ODataApi';
import { Observable } from '@reactivex/rxjs';

export class Query<T extends Content = Content>{
    private readonly segments: QuerySegment<T>[] = [];
    public addSegment(newSegment: QuerySegment<T> ) {
        this.segments.push(newSegment);
    }

    public toString(): string{
        return this.segments.map(s => s.toString()).join('');
    }

    constructor(build: (first: QueryExpression<T>) => void) {
        const firstExpression = new QueryExpression<T>(this);
        build(firstExpression);
    }

    public static Create<T extends Content = Content>(build: (first: QueryExpression<Content>) => QuerySegment<T>): Query<T> {
        return new Query<T>(build);
    }

    public static Exec<TReturns extends Content>(build: (first: QueryExpression<Content>) => QuerySegment<TReturns> | string, 
            repository: BaseRepository, 
            path: string,
            params: ODataParams = {}
        ): Observable<QueryResult<TReturns>>{

        const query: string = typeof build === 'function' ? Query.Create(build as any).toString() : build;
        params.query = query.toString();
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
