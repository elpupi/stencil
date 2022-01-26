import type { KebabCase } from '@upradata/util';

export interface BreakPoint<Alias = string, Prefix = string> {
    mediaQuery: string;
    overlapping?: boolean;  // ranges
    priority?: number;
    alias: Alias;
    prefix?: Prefix;
}

export const BREAKPOINT_MILESTONE: { alias: string, width: number; }[] = [
    { alias: 'sm', width: 640 },
    { alias: 'premd', width: 840 },
    { alias: 'md', width: 960 },
    { alias: 'lg', width: 1280 },
    { alias: 'big', width: 1400 },
    { alias: 'xl', width: 1600 },
    { alias: 'prehuge', width: 1900 }, // bug in chrome. When I resize chrome at full screen 1920, media query matches xl and huge!!!
    { alias: 'huge', width: 1920 }
].sort((a, b) => a.width - b.width); // to be sure it is in ascending order



// I will use it in MediaQueryService to get the good key for the breakpoints
type BREAKPOINTS_ALIAS_NAMES_CAMELIZE = {
    xs, sm, premd, md, lg, big, xl, prehuge, huge,
    ltXs, ltSm, ltPremd, ltMd, ltLg, ltBig, ltXl, ltPrehuge, ltHuge,
    lteXs, lteSm, ltePremd, lteMd, lteLg, lteBig, lteXl, ltePrehuge, lteHuge,
    gtXs, gtSm, gtPremd, gtMd, gtLg, gtBig, gtXl, gtPrehuge, gtHuge,
    gteXs, gteSm, gtePremd, gteMd, gteLg, gteBig, gteXl, gtePrehuge, gteHuge;
    handset, handsetLandscape, handsetPortrait,
    tablet, tabletLandscape, tabletPortrait,
    web, webLandscape, webPortrait;
};


export type BreakpointAliasJs = keyof BREAKPOINTS_ALIAS_NAMES_CAMELIZE;
export type BreakpointAlias = KebabCase<BreakpointAliasJs>;


export function findBpMileStoneByAlias(alias: string) {
    return BREAKPOINT_MILESTONE.find(breakpoint => breakpoint.alias === alias);
}


export function bpPrioritySort(a: BreakPoint, b: BreakPoint): number {
    const priorityA = a.priority || 0;
    const priorityB = b.priority || 0;
    return priorityB - priorityA;
}
