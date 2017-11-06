import { IContent } from './IContent';

export interface ISavedContent extends IContent {
    Id: number;
    Path: string;
    Name: string;
}
