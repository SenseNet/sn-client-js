/**
 * @module Config
 *//** */

import { SnConfigBehavior } from './snconfigbehavior';
import { SnConfigField } from './snconfigfielddecorator';

/**
 * Class that represents a typed model for the Sense/Net related configuration for an NPM Package. The values can be populated from sn.config.js.
 */
export class SnConfigModel {

    public static get DEFAULT_BASE_URL(): string {
        if (typeof window !== 'undefined')
            return (window && window.location && window.location.href) || '';
        return '';
    }
    public static readonly DEFAULT_SERVICE_TOKEN: string = 'odata.svc';


    /**
     * The root URL for the Sense/Net repository (e.g.: demo.sensenet.com)
     */
    @SnConfigField({
        Behavior: SnConfigBehavior.AllowFromConfig | SnConfigBehavior.AllowFromCommandLine,
        FieldDescription: 'URL to the repository (e.g.: demo.sensenet.com)',
        Question: 'Please enter your Sense/Net Site URL(e.g.:demo.sensenet.com):',
    })
    public RepositoryUrl: string = SnConfigModel.DEFAULT_BASE_URL;

    /**
     * The service token for the OData Endpoint
     */
    @SnConfigField({
        Behavior: SnConfigBehavior.AllowFromConfig | SnConfigBehavior.AllowFromCommandLine,
        FieldDescription: 'The service token for the OData Endpoint',
        Question: 'Please enter your Sense/Net Site URL(e.g.:demo.sensenet.com):',
    })
    public ODataToken: string = SnConfigModel.DEFAULT_SERVICE_TOKEN;


    /**
     * This string represents how the Jwt Web Token will be stored in the localStorage.
     */
    @SnConfigField({
        Behavior: SnConfigBehavior.AllowFromConfig,
        FieldDescription: 'Template will be stored in that format',
        Question: 'Please specify the template format for the key of the JWT Web Token in the localStorage (e.g.: sn-${siteName}-${tokenName})'
    })
    public JwtTokenKeyTeplate: string = 'sn-${siteName}-${tokenName}';

    /**
     *
     * @param {Partial<SnConfigMoel>} config Partial config values, the default values will be overwritten if provided
     * @constructs {SnConfigModel}
     */
    constructor(config?: Partial<SnConfigModel>) {
        if (config) {
            for (let key in config) {
                if (config[key]) {
                    this[key] = config[key];
                }
            }
        }
    }
}
