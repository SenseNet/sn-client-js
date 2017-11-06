/**
 * @module Repository
 */
/** */
import { JwtService } from '../Authentication/JwtService';
import { SnConfigModel } from '../Config/snconfigmodel';
import { RxAjaxHttpProvider } from '../HttpProviders/RxAjaxHttpProvider';
import { BaseRepository } from './';

/**
 * This class defines a defaul sense NET ECM Repository implementation
 * that uses an RxJs based Ajax HTTP Provider and a JWT Token Authentication Service
 */
export class SnRepository extends BaseRepository<RxAjaxHttpProvider, JwtService> {
    /**
     * @param {Partial<SnConfigModel>} config The partial config entry used by the repository
     */
    constructor(config?: Partial<SnConfigModel>) {
        super(new SnConfigModel(config), RxAjaxHttpProvider, JwtService);
    }
}
