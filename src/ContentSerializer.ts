/**
 * @module ContentSerializer
 * @preferred
 * @description Utility to serialize and deserialize Content instances.
 * 
 * */ /** */

import { Content } from './Content';
import { ODataHelper } from './SN';

/**
 * Represents a serialized Content instance wich can be stringified using JSON.stringify()
 */
export class SerializedContent<T extends Content>{
    /**
     * The original content's field data
     */
    Data: T['options'];
    /**
     * The full original Path for the original Content (e.g.: 'https://my.sensenet.com/OData.svc/Root/Temp/MyContent)
     */
    Origin: string;
}

export class ContentSerializer {
    /**
     * Creates a SerializedContent instance from a Content instance
     * @throws If the content Path is not provided and the Origin cannot be determined
     * @param {Content} content The Content that needs to be serialized
     * @returns {SerializedContent} the SerializedContent instance
     */
    public static Serialize<T extends Content>(content: T): SerializedContent<T> {
        if (!content.Path) {
            throw new Error('Content Path required!');
        }
        const repoUrl = content.GetRepository().ODataBaseUrl;
        return {
            Data: content.GetFields(true),
            Origin: ODataHelper.joinPaths(`${repoUrl}`, content.Path)
        }
    }

    /**
     * Creates a stringified SerializedContent instance from a Content instance
     * @param content The Content instance that needs to be serialized
     * @returns {string} The Stringified content
     */
    public static Stringify<T extends Content>(content: T) {
        return JSON.stringify(this.Serialize(content));
    }
    /**
     * Serializes a stringified SerializedContent string to a SerializedContent instance
     * @param contentString the stringified SerializedContent data
     */
    public static Parse<T extends Content = Content>(contentString: string): SerializedContent<T> {
        return JSON.parse(contentString) as SerializedContent<T>;
    }
}