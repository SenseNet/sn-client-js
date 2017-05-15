/**
 * @module Repository
 */
/** */

import { BaseRepository } from '../../src/Repository/index';
import { MockHttpProvider } from './MockHttpProvider';
import { SnConfigModel } from '../../src/Config';
import { Content } from '../../src/Content';
import { MockAuthService } from './MockAuthService';

export class MockRepository extends BaseRepository<MockHttpProvider, Content>{
    constructor(config?: SnConfigModel) {
        if (!config){
            config = new SnConfigModel();
        }
        super(config, MockHttpProvider, MockAuthService);

        let auth = (this.Authentication as MockAuthService);
    }

}