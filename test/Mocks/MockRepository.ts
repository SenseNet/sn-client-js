/**
 * @module Mocks
 */ /** */

import { SnConfigModel } from '../../src/Config';
import { BaseRepository } from '../../src/Repository/index';
import { MockAuthService } from './MockAuthService';
import { MockHttpProvider } from './MockHttpProvider';

export class MockRepository extends BaseRepository<MockHttpProvider, MockAuthService> {
    constructor(config?: Partial<SnConfigModel>) {
        if (!config) {
            config = new SnConfigModel();
        }
        super(config, MockHttpProvider, MockAuthService);
    }

}
