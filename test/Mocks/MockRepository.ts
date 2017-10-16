/**
 * @module Mocks
 */ /** */

import { BaseRepository } from '../../src/Repository/index';
import { MockHttpProvider } from './MockHttpProvider';
import { SnConfigModel } from '../../src/Config';
import { MockAuthService } from './MockAuthService';

export class MockRepository extends BaseRepository<MockHttpProvider, MockAuthService>{
    constructor(config?: Partial<SnConfigModel>) {
        if (!config){
            config = new SnConfigModel();
        }
        super(config, MockHttpProvider, MockAuthService);
    }

}