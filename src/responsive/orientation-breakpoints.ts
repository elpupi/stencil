import { max, min } from './media-query-util';
import { BreakPoint, BreakpointAlias } from './breakpoints';

// from angular/flex-layout/src/lib/core/breakpoints/data/orientation-break-points.ts
const HANDSET_PORTRAIT = `${max('sm', -0.1)} and (orientation: portrait)`;
const HANDSET_LANDSCAPE = `${max('md', -0.1)} and (orientation: landscape)`;

const TABLET_PORTRAIT = `${min('sm')} and ${max('premd', -0.1)} and (orientation: portrait)`;
const TABLET_LANDSCAPE = `${min('md')} and ${max('lg', -0.1)} and(orientation: landscape)`;

const WEB_PORTRAIT = `${min('premd')} and (orientation: portrait)`;
const WEB_LANDSCAPE = `${min('lg')} and (orientation: landscape)`;



const OrientationMQ = {
    HANDSET: `${HANDSET_PORTRAIT}, ${HANDSET_LANDSCAPE}`,
    TABLET: `${TABLET_PORTRAIT} , ${TABLET_LANDSCAPE}`,
    WEB: `${WEB_PORTRAIT}, ${WEB_LANDSCAPE} `,

    HANDSET_PORTRAIT: `${HANDSET_PORTRAIT}`,
    TABLET_PORTRAIT: `${TABLET_PORTRAIT} `,
    WEB_PORTRAIT: `${WEB_PORTRAIT}`,

    HANDSET_LANDSCAPE: `${HANDSET_LANDSCAPE}]`,
    TABLET_LANDSCAPE: `${TABLET_LANDSCAPE}`,
    WEB_LANDSCAPE: `${WEB_LANDSCAPE}`
};

export const ORIENTATION_BREAKPOINTS: BreakPoint[] = [
    { alias: 'handset' as BreakpointAlias, priority: 2000, mediaQuery: OrientationMQ.HANDSET },
    { alias: 'handset-landscape' as BreakpointAlias, priority: 2000, mediaQuery: OrientationMQ.HANDSET_LANDSCAPE },
    { alias: 'handset-portrait' as BreakpointAlias, priority: 2000, mediaQuery: OrientationMQ.HANDSET_PORTRAIT },

    { alias: 'tablet' as BreakpointAlias, priority: 2100, mediaQuery: OrientationMQ.TABLET },
    { alias: 'tablet-landscape' as BreakpointAlias, priority: 2100, mediaQuery: OrientationMQ.TABLET },
    { alias: 'tablet-portrait' as BreakpointAlias, priority: 2100, mediaQuery: OrientationMQ.TABLET_PORTRAIT },

    { alias: 'web' as BreakpointAlias, priority: 2200, mediaQuery: OrientationMQ.WEB, overlapping: true },
    { alias: 'web-landscape' as BreakpointAlias, priority: 2200, mediaQuery: OrientationMQ.WEB_LANDSCAPE, overlapping: true },
    { alias: 'web-portrait' as BreakpointAlias, priority: 2200, mediaQuery: OrientationMQ.WEB_PORTRAIT, overlapping: true }
];

/* console.log(ORIENTATION_BREAKPOINTS.sort((l, r) => l.priority - r.priority)); */
