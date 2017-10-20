import { IContent } from './IContent';
import { ISavedContent } from './ISavedContent';
import { ContentInternal } from './index';

export type Content<T extends IContent = IContent> = ContentInternal<T> & T;

export type SavedContent<T extends IContent = IContent> = ContentInternal<T> & T & ISavedContent;
