/**
 * @module Query
 * */ /** */
import { Content, SavedContent } from '../Content';

/**
 * Represents a Content Query result
 */
export class QueryResult<T extends Content>{
    /**
     * The result yielded by the Query
     */
    Result: SavedContent<T>[];
    /**
     * The item count
     */
    Count: number;
}