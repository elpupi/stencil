import type { ObjectOf } from '@upradata/util';
import { servicesLoaded$ } from '@upradata/browser-util';
import type  { BaseService } from '../util';
import type  { MtModulesServices } from './types';

type Primitive = string | boolean | number;

export type Service = BaseService | Primitive | Array<any> | ObjectOf<any>;

export const servicesLoaded = () => servicesLoaded$<MtModulesServices>();
