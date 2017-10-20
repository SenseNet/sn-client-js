/**
 * @module Query
 * */ /** */
import { SavedContent, IContent } from '../Content';

/**
 * Represents a Content Query result
 */
export class QueryResult<T extends IContent = IContent>{
    /**
     * The result yielded by the Query
     */
    Result: SavedContent<T>[];
    /**
     * The item count
     */
    Count: number;
}