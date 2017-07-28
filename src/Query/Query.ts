import { Content } from '../Content';
import { QuerySegment, QueryExpression } from '.';


export class Query<T>{
    private readonly segments: QuerySegment<T>[] = [];
    public addSegment(newSegment: QuerySegment<T>) {
        this.segments.push(newSegment);
    }

    constructor(public readonly rootPath: string, build: (first: QueryExpression<T>) => void) {
        const firstExpression = new QueryExpression<T>(this);
        build(firstExpression);
    }

    public static Create<T extends Content = Content>(rootPath: string, build: (first: QueryExpression<T>) => void): Query<T> {
        return new Query<T>(rootPath, build);
    }
}
