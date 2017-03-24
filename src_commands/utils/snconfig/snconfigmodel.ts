import { SnConfigField, SnConfigBehavior } from './';


/**
 * Class that represents a typed model for the Sense/Net related configuration for an NPM Package
 */
export class SnConfigModel {

    /**
     * The root URL for the Sense/Net repository (e.g.: demo.sensenet.com)
     */
    @SnConfigField({
        Question: 'Please enter your Sense/Net Site URL(e.g.:demo.sensenet.com):',
        Behavior: SnConfigBehavior.AllowFromConfig
    })
    RepositoryUrl: string;

    /**
     * The Username for authentication
     */
    @SnConfigField({
        Question: 'Please enter the username: ',
        Behavior: SnConfigBehavior.AllowFromConfig
    })
    UserName?: string;

    /**
     * The password for authentication
     */
    @SnConfigField({
        Question: 'Please enter the password for the user',
        Behavior: SnConfigBehavior.HideConsoleInput
    })
    Password?: string;
}