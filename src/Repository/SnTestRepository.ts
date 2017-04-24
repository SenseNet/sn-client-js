/**
 * @module Repository
 */
/** */
import { BaseRepository } from './';
import { HttpProviders, Content } from '../SN';
import { SnConfigModel } from '../Config/snconfigmodel';
import { JwtService } from '../Authentication/JwtService';
export class SnTestRepository extends BaseRepository<HttpProviders.MockHttpProvider, Content>{
    constructor(config?: SnConfigModel) {
        if (!config){
            config = new SnConfigModel();
        }
        super(HttpProviders.MockHttpProvider, config, JwtService);
    }

}