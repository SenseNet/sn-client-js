/**
 * @module Query
 */ /** */
import { IContent, SavedContent } from '../Content';

/**
 * Represents a Content Query result
 */
export class QueryResult<T extends IContent = IContent> {
    /**
     * The result yielded by the Query
     */
    public Result: SavedContent<T>[];
    /**
     * The item count
     */
    public Count: number;
}
