export interface IContent {
    Type?: string;
    /**
     * Name of the Content
     */
    Name?: string;

    /**
     * An unique identifier for a content
     */
    Id?: number;
    DisplayName?: string;
    Description?: string;
    Icon?: string;
    Index?: number;
    CreationDate?: string;
    ModificationDate?: string;
    ParentId?: number;
    IsFolder?: boolean;
    Path?: string;

}