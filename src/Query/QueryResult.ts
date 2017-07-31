import { Content } from  '../Content';


export class QueryResult<T extends Content>{
    Result: T[];
    Count: number

}