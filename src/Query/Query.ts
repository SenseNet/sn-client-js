import { Content } from '../Content';
import { QuerySegment, QueryExpression } from '.';
import { Observable } from '@reactivex/rxjs';


export class Query<T extends Content = Content>{
    private readonly segments: QuerySegment<T>[] = [];
    public addSegment(newSegment: QuerySegment<T>) {
        this.segments.push(newSegment);
    }

    public toString(): string{
        return this.segments.map(s => s.toString()).join();
    }

    public Exec(): Observable<T[]>{
        console.warn('Query execution not implemented yet!');
        return Observable.of([]);
    }

    constructor(public readonly rootPath: string, build: (first: QueryExpression<T>) => void) {
        const firstExpression = new QueryExpression<T>(this);
        build(firstExpression);
    }

    public static Create<T extends Content = Content>(rootPath: string, build: (first: QueryExpression<Content>) => QuerySegment<T>): Query<T> {
        return new Query<T>(rootPath, build);
    }
}
