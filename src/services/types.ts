import { ResponsiveServices, ResponsiveServicesConfig } from '../responsive/types';
import { BaseService } from '../util';
import { ServicesConfig, ServiceConfig } from '@upradata/browser-util';

export type Service = BaseService | any;


export interface MtServices {
    responsive: ResponsiveServices;
}


export class MtServicesConfig extends ServicesConfig<MtServices>{

    services: {
        responsive: ServiceConfig<ResponsiveServicesConfig, ResponsiveServices>;
    };
}
