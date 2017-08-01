/**
 * @module Query
 * */ /** */
import { Content } from  '../Content';

/**
 * Represents a Content Query result
 */
export class QueryResult<T extends Content>{
    /**
     * The result yielded by the Query
     */
    Result: T[];
    /**
     * The item count
     */
    Count: number;
}