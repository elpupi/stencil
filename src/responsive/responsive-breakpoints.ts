import { ORIENTATION_BREAKPOINTS } from './orientation-breakpoints';
import { BREAKPOINTS } from './range-breakpoints';
import type { BreakPoint, BreakpointAlias } from './breakpoints';

export const LAYOUT_BREAKPOINTS = [
    ...BREAKPOINTS,
    ...ORIENTATION_BREAKPOINTS
] as BreakPoint<BreakpointAlias, 'lt' | 'gt'>[];

export function findBpByAlias(alias: string) {
    return LAYOUT_BREAKPOINTS.find(breakpoint => breakpoint.alias === alias);
}

// tslint:disable: max-line-length

/*
https://medium.com/hceverything/applying-srcset-choosing-the-right-sizes-for-responsive-images-at-different-breakpoints-a0433450a4a3

1920px (this covers FullHD screens and up)
1600px (this will cover 1600px desktops and several tablets in portrait mode, for example iPads at 768px width, which will request a 2x image of 1536px and above)
1366px (it is the most widespread desktop resolution)
1024px (1024x768 screens, excluding iPads which are hi-density anyway, are rarer, but I think you need some image size in between, not to leave too big a gap between pixel sizes, in case the market changes)
768px (useful for 2x 375px mobile screens, as well as any device that actually requests something close to 768px)
640px (for smartphones)
// Maybe I could add for big resolutions like 4K somethinh like 2240
*/




/* export const imageBreakpoints = breakpoints.filter(breakPoint => {
    switch (breakPoint.alias) {
        case 'sm':
        case 'md':
        case 'lg':
        case 'big':
        case 'xl':
        case 'huge': return true;
        default: return false;
    }
}); */





/* handset: `${max('sm', -0.1)} and (orientation: portrait), ${max('md', -0.1)}  and (orientation: landscape)`,
    tablet: `${min('sm')} and ${max('premd', -0.1)} and (orientation: portrait), ${min('md')} and ${max('lg', -0.1)} and (orientation: landscape)`,
        web: `${min('premd')} and (orientation: portrait), ${min('lg')} and (orientation: landscape)`,

 */
/* export const breakpointRanges = {
    xs: '(max-width: 599.99px)',
    sm: '(min-width: 600px) and (max-width: 959.99px)',
    md: '(min-width: 960px) and (max-width: 1279.99px)',
    lg: '(min-width: 1280px) and (max-width: 1399.99px)',
    big: '(min-width: 1400px) and (max-width: 1599.99px)',
    xl: '(min-width: 1600px) and (max-width: 1899.99px)', // bug in chrome. When I resize chrome at full screen 1920, media query matche xl and huge!!!
    prehuge: '(min-width: 1900px) and (max-width: 1919.99px)',
    huge: '(min-width: 1920px)',

    leSm: '(max-width: 600px)',
    leMd: '(max-width: 960px)',
    leLg: '(max-width: 1280px)',
    leBig: '(max-width: 1400px)',
    leXl: '(max-width: 1600px)', // bug in chrome. When I resize chrome at full screen 1920, media query matche xl and huge!!!
    lePrehuge: '(max-width: 1900px)',
    leHuge: '(max-width: 1920px)',


    handset: '(max-width: 599.99px) and (orientation: portrait), ' +
        '(max-width: 959.99px) and (orientation: landscape)',
    tablet: '(min-width: 600px) and (max-width: 839.99px) and (orientation: portrait), ' +
        '(min-width: 960px) and (max-width: 1279.99px) and (orientation: landscape)',
    web: '(min-width: 840px) and (orientation: portrait), ' +
        '(min-width: 1280px) and (orientation: landscape)',

    handsetPortrait: '(max-width: 599.99px) and (orientation: portrait)',
    tabletPortrait: '(min-width: 600px) and (max-width: 839.99px) and (orientation: portrait)',
    webPortrait: '(min-width: 840px) and (orientation: portrait)',

    handsetLandscape: '(max-width: 959.99px) and (orientation: landscape)',
    tabletLandscape: '(min-width: 960px) and (max-width: 1279.99px) and (orientation: landscape)',
    webLandscape: '(min-width: 1280px) and (orientation: landscape)',
}; */
