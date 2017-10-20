import { IContent } from './IContent';
import { ContentInternal } from './index';
import { ISavedContent } from './ISavedContent';

export type Content<T extends IContent = IContent> = ContentInternal<T> & T;

export type SavedContent<T extends IContent = IContent> = ContentInternal<T> & T & ISavedContent;
