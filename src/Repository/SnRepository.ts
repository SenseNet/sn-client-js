/**
 * @module Repository
 */
/** */
import { BaseRepository } from './';
import { HttpProviders, Repository, Content } from '../SN';
import { SnConfigModel } from '../Config/snconfigmodel';
import { JwtService } from '../Authentication/JwtService';
export class SnRepository extends BaseRepository<HttpProviders.RxAjaxHttpProvider, Content>{
    constructor(config?: Partial<SnConfigModel>) {
        super(new SnConfigModel(config), HttpProviders.RxAjaxHttpProvider, JwtService);
    }
}