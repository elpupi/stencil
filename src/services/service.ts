import { BaseService } from '../util';
import { ObjectOf } from '@upradata/util';

type Primitive = string | boolean | number;

export type Service = BaseService | Primitive | Array<any> | ObjectOf<any>;
