import { ResponsiveServices, ResponsiveServicesConfig } from '../responsive/types';
import { BaseService } from '../util';

export type Service = BaseService | any;


export interface MtServices {
    responsive: ResponsiveServices;
}

export type Services<T> = {
    [ key in keyof T ]: Service;
};


export interface LoadServices<C, S extends Services<Service>> {
    (configuration?: Partial<C>): Promise<Partial<S>>;
}

export interface LoadServicesModule<C, S extends Services<Service>> {
    loadServices: LoadServices<C, S>;
}


export class MtServicesConfig {
    services: {
        responsive: ResponsiveServicesConfig;
    };
    globalVariable: string = 'mt';
    include: Partial<Record<keyof MtServices, boolean>>;
    exclude: Partial<Record<keyof MtServices, boolean>>;
    dispatchEvents: boolean = true;
}
