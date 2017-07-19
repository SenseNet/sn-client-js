import{Content} from './Content';
import { BaseRepository } from './Repository/BaseRepository';
import { ODataHelper } from './SN';

export class SerializedContent<T extends Content>{
    Data: T['options'];
    Origin: string;
}

export class ContentSerializer {
    public static Serialize<T extends Content>(content: T): SerializedContent<T> {
        if (!content.Path){
            throw new Error('Content Path required!');
        }
        const repoUrl = (content['repository'] as BaseRepository).ODataBaseUrl;
        return {
            Data: content.GetFields(true),
            Origin: ODataHelper.joinPaths(`${repoUrl}`, content.Path)
        }
    }

    public static Stringify<T extends Content>(content: T){
        return JSON.stringify(this.Serialize(content));
    }
    public static Parse<T extends Content = Content>(contentString: string): SerializedContent<T>{
        return JSON.parse(contentString) as SerializedContent<T>;
    }
}