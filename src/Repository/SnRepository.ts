/**
 * @module Repository
 */
/** */
import { BaseRepository } from './';
import { SnConfigModel } from '../Config/snconfigmodel';
import { JwtService } from '../Authentication/JwtService';
import { RxAjaxHttpProvider } from '../HttpProviders/RxAjaxHttpProvider';

/**
 * This class defines a defaul sense NET ECM Repository implementation
 * that uses an RxJs based Ajax HTTP Provider and a JWT Token Authentication Service
 */
export class SnRepository extends BaseRepository<RxAjaxHttpProvider, JwtService>{
    /**
     * @param {Partial<SnConfigModel>} config The partial config entry used by the repository
     */
    constructor(config?: Partial<SnConfigModel>) {
        super(new SnConfigModel(config), RxAjaxHttpProvider, JwtService);
    }
}