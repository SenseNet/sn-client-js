import { SnConfigField } from './snconfigfielddecorator'


/**
 * Class that represents a typed model for the Sense/Net related configuration for an NPM Package
 */
export class SnConfigModel {

    /**
     * The root URL for the Sense/Net repository (e.g.: demo.sensenet.com)
     */
    @SnConfigField({
        Question: 'Please enter your Sense/Net Site URL(e.g.:demo.sensenet.com):',
        Type: 'Text'
    })
    RepositoryUrl: string;

    /**
     * The Username for authentication
     */
    @SnConfigField({
        Question: 'Please enter the username: ',
        Type: 'Text'
    })
    UserName?: string;

    /**
     * The password for authentication
     */
    @SnConfigField({
        Question: 'Please enter the password for the user',
        Type: 'Password'
    })
    Password?: string;
}