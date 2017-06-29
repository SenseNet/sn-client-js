/**
 * @module Repository
 */
/** */
import { BaseRepository } from './';
import { HttpProviders, Repository, Content } from '../SN';
import { SnConfigModel } from '../Config/snconfigmodel';
import { JwtService } from '../Authentication/JwtService';

/**
 * This class defines a defaul sense NET ECM Repository implementation
 * that uses an RxJs based Ajax HTTP Provider and a JWT Token Authentication Service
 */
export class SnRepository extends BaseRepository<HttpProviders.RxAjaxHttpProvider, JwtService, Content>{
    /**
     * @param {Partial<SnConfigModel>} config The partial config entry used by the repository
     */
    constructor(config?: Partial<SnConfigModel>) {
        super(new SnConfigModel(config), HttpProviders.RxAjaxHttpProvider, JwtService);
    }
}