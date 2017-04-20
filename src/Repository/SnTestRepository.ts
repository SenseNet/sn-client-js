/**
 * @module Repository
 */
/** */
import { BaseRepository } from './';
import { HttpProviders, Content } from '../SN';
export class SnTestRepository extends BaseRepository<HttpProviders.MockHttpProvider, Content>{
    constructor(baseUrl?: string, serviceToken?: string) {
        super(HttpProviders.MockHttpProvider, baseUrl, serviceToken);
    }

}