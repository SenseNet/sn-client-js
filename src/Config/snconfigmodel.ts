/**
 * @module Config
 *//** */

import { SnConfigBehavior } from './snconfigbehavior';
import { SnConfigField } from './snconfigfielddecorator';
import { ODataMetadataType, ODataFieldParameter } from '../ODataApi/ODataParams';
import { Content } from '../Content';

/**
 * Class that represents a typed model for the Sense/Net related configuration for an NPM Package. The values can be populated from sn.config.js.
 */
export class SnConfigModel {

    /**
     * The default base URL, returns window.location if available
     */
    public static get DEFAULT_BASE_URL(): string {
        if (typeof window !== 'undefined')
            return (window && window.location && window.location.origin) || '';
        return '';
    }

    /**
     * The default Sense/Net OData Service token (odata.svc)
     */
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
    public JwtTokenKeyTemplate: string = 'sn-${siteName}-${tokenName}';


    /**
     * This string describes how long the JWT token should be persisted.
     */
    @SnConfigField({
        Behavior: SnConfigBehavior.AllowFromConfig,
        FieldDescription: 'The behavoir how long the JWT tokens should be persisted, can be "session" or "expiration"',
        Question: ''
    })
    public JwtTokenPersist: 'session' | 'expiration' = 'session';

    /**
     * This parameter describes what fields should be included in the OData $select statements by default
     */
    @SnConfigField({
        Behavior: SnConfigBehavior.AllowFromConfig,
        FieldDescription: 'The default values to select when triggering an OData Action',
        Question: ''
    })
    public DefaultSelect: ODataFieldParameter<Content> | 'all' = ['DisplayName', 'Description', 'Icon']


    /**
     * This parameter describes what fields should always be included in the OData $select statements
     */
    @SnConfigField({
        Behavior: SnConfigBehavior.AllowFromConfig,
        FieldDescription: 'The values are required when triggering an OData Action and will be always included in Select statements',
        Question: ''
    })
    public RequiredSelect: ODataFieldParameter<Content> = ['Id', 'Path', 'Name', 'Type']

    /**
     * This field sets the default OData $metadata value
     */
    @SnConfigField({
        Behavior: SnConfigBehavior.AllowFromConfig,
        FieldDescription: 'The default OData metadata option',
        Question: ''
    })
    public DefaultMetadata: ODataMetadataType = 'no';

    /**
     * This field sets the default OData inline count value
     */
    @SnConfigField({
        Behavior: SnConfigBehavior.AllowFromConfig,
        FieldDescription: 'The default OData inline count option',
        Question: ''
    })
    public DefaultInlineCount: 'allpages' | 'none' = 'allpages'

    /**
     * This field describes what fields should be expanded on every OData request by default
     */
    @SnConfigField({
        Behavior: SnConfigBehavior.AllowFromConfig,
        FieldDescription: 'The default OData references to expand',
        Question: ''
    })
    public DefaultExpand: ODataFieldParameter<Content> | undefined = undefined;

    /**
     * This field sets up a default OData $top parameter
     */
    @SnConfigField({
        Behavior: SnConfigBehavior.AllowFromConfig,
        FieldDescription: 'The default OData $top parameter for querying / fetching content',
        Question: ''
    })
    public DefaultTop: number = 1000;

    /**
     * Chunk size for chunked uploads, must be equal to BinaryChunkSize setting at the backend
     */
    @SnConfigField({
        Behavior: SnConfigBehavior.AllowFromConfig,
        FieldDescription: 'Chunk size for chunked uploads, must be equal to BinaryChunkSize setting at the backend',
        Question: ''
    })
    public ChunkSize: number = 10485760;    // 10 mb

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
