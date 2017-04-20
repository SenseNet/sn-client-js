/**
 * @module Repository
 */
/** */
import { BaseRepository } from './';
import { HttpProviders, Repository, Content } from '../SN';
export class SnRepository extends BaseRepository<HttpProviders.RxAjaxHttpProvider, Content>{
    constructor(baseUrl?: string, serviceToken?: string) {
        super(HttpProviders.RxAjaxHttpProvider, baseUrl, serviceToken);
    }
}