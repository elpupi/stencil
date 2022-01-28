import { LoadServices } from '@upradata/browser-util';
import { Policy, PolicyShort, Terms } from '.';
import { Api } from '../api';
import { TermsModuleServices, TermsModuleServicesOptions, TermsModuleServicesOpts } from './types';


export const loadServices: LoadServices<TermsModuleServicesOpts, TermsModuleServices> = options => {
    const common = options?.common;

    const api = <Name extends keyof TermsModuleServices>(serviceName: Name) => {
        const a = { ...(options[ serviceName ] as TermsModuleServicesOptions[ Name ])?.api, ...common.api } as Api;

        if (!a.domain || !a.url)
            throw new Error(`"${serviceName}" service must provide a valid Api with a domain and a url: ${a}`);

        return a;
    };

    return {
        police: options.police ? new Policy({ ...common, ...options.police, api: api('police') }) : undefined,
        policeShort: options.policeShort ? new PolicyShort({ ...common, ...options.policeShort, api: api('policeShort') }) : undefined,
        terms: options.terms ? new Terms({ ...common, ...options.terms, api: api('terms') }) : undefined
    };
};
