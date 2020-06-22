import { ReplaySubject } from 'rxjs';
import { MtServicesConfig, MtServices } from './types';
import { loadServices as load } from '@upradata/browser-util';
import { Function1 } from '@upradata/util';


const loaded$ = new ReplaySubject<MtServices>(1);

export const loadServices = (config: Partial<MtServicesConfig>) => load(config).then((loadedServices: MtServices) => {
    resolve(loadedServices);
    loaded$.next(loadedServices);
});


let resolve: Function1<MtServices> = undefined;
export const services$ = new Promise<MtServices>((res, _rej) => resolve = res);
export const servicesObs$ = loaded$.asObservable();
