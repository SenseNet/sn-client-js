/**
 * @module Content
 */ /** */

import { IContent } from './IContent';

/**
 * Interface that represents a saved Content
 */
export interface ISavedContent extends IContent {
    /**
     * Unique identifier
     */
    Id: number;
    /**
     * Full Content path
     */
    Path: string;
    /**
     * Content Name
     */
    Name: string;
}
