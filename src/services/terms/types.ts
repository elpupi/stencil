
import { ModuleServices } from '@upradata/browser-util';
import { PolicyShort, PolicyShortOptions } from './policy-short';
import { Policy, PolicyOptions } from './policy';
import { Terms, TermsOptions } from './terms';
import { Service } from '../service';
import { TermsBaseOptions } from './terms.base';
import { Api } from '../api';


export type TermsModuleServices = ModuleServices<Service, {
    police: Policy;
    policeShort: PolicyShort;
    terms: Terms;
}>;

type TermsBaseOpts = Omit<TermsBaseOptions, 'api' | 'htmlCodeId'> & { api?: Partial<Api>; };
type Options<T> = Omit<T, 'api'> & { api?: Partial<Api>; };

export type TermsModuleServicesOptions = {
    common: TermsBaseOpts;
    police?: Options<PolicyOptions>;
    policeShort?: Options<PolicyShortOptions>;
    terms?: Options<TermsOptions>;
};


export type TermsModuleServicesOpts = {
    [ K in keyof TermsModuleServicesOptions ]: K extends 'common' ? TermsModuleServicesOptions[ K ] : TermsModuleServicesOptions[ K ] | false
};
