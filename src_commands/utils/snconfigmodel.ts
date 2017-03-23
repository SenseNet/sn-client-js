/**
 * Class that represents a typed model for the Sense/Net related configuration for an NPM Package
 */
export class SnConfigModel {

    /**
     * The root URL for the Sense/Net repository (e.g.: demo.sensenet.com)
     */
    RepositoryUrl: string;

    /**
     * The Username for authentication
     */
    UserName?: string;

    /**
     * The password for authentication
     */
    Password?: string;
}