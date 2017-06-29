/**
 * @module Repository
 */
/** */

import { BaseRepository } from '../../src/Repository/index';
import { MockHttpProvider } from './MockHttpProvider';
import { SnConfigModel } from '../../src/Config';
import { Content } from '../../src/Content';
import { MockAuthService } from './MockAuthService';

export class MockRepository extends BaseRepository<MockHttpProvider, MockAuthService, Content>{
    constructor(config?: Partial<SnConfigModel>) {
        if (!config){
            config = new SnConfigModel();
        }
        super(config, MockHttpProvider, MockAuthService);

        let auth = (this.Authentication as MockAuthService);
    }

}