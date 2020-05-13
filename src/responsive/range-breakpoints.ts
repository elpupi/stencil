import { BREAKPOINT_MILESTONE, BreakPoint, BreakpointAlias } from './breakpoints';
import { max, min } from './media-query-util';



// from https://github.com/angular/components/blob/master/src/cdk/layout/breakpoints.ts with customizations
// export type MediaQuery = string;
export const BREAKPOINTS: BreakPoint[] = []; // { [ alias: string ]: MediaQuery } = {};

const enableScreen = false;
const SCREEN = enableScreen ? 'screen and ' : '';


const nbBreakpoints = BREAKPOINT_MILESTONE.length;


const startPriority = {
    eq: 600 + (nbBreakpoints) * 100,
    lt: 650 + (nbBreakpoints) * 100,
    gt: -650 - (nbBreakpoints) * 100
};


for (let i = 0; i < nbBreakpoints; ++i) {
    const alias = BREAKPOINT_MILESTONE[ i ].alias as BreakpointAlias;

    // We create range match queries [min, max]
    if (i === 0)
        // we add xs breakpoint (is open to the left)
        BREAKPOINTS.push({ alias: 'xs', mediaQuery: SCREEN + max(BREAKPOINT_MILESTONE[ 0 ].alias, - 0.1), priority: startPriority.eq });

    if (i === nbBreakpoints - 1)
        // the last one is open to the right
        BREAKPOINTS.push({ alias, mediaQuery: SCREEN + min(BREAKPOINT_MILESTONE[ i ].alias), priority: startPriority.eq - (i + 1) * 100 });

    else
        BREAKPOINTS.push({
            alias,
            mediaQuery: SCREEN + min(BREAKPOINT_MILESTONE[ i ].alias) + ' and ' + max(BREAKPOINT_MILESTONE[ i + 1 ].alias, -0.1),
            priority: startPriority.eq - (i + 1) * 100
        });



    // we create <= match queries
    BREAKPOINTS.push({
        alias: 'lte-' + BREAKPOINT_MILESTONE[ i ].alias as BreakpointAlias,
        mediaQuery: SCREEN + max(BREAKPOINT_MILESTONE[ i ].alias),
        priority: startPriority.lt - (i + 1) * 100,
        overlapping: true,
        prefix: 'lt'
    });

    // we create < match queries
    BREAKPOINTS.push({
        alias: 'lt-' + BREAKPOINT_MILESTONE[ i ].alias as BreakpointAlias,
        mediaQuery: SCREEN + max(BREAKPOINT_MILESTONE[ i ].alias, - 0.1),
        priority: startPriority.lt - (i + 1) * 100 + 1,
        overlapping: true,
        prefix: 'lt'
    });

    // we create >= match queries
    BREAKPOINTS.push({
        alias: 'gte-' + BREAKPOINT_MILESTONE[ i ].alias as BreakpointAlias,
        mediaQuery: SCREEN + min(BREAKPOINT_MILESTONE[ i ].alias),
        priority: startPriority.gt + (i + 1) * 100,
        overlapping: true,
        prefix: 'gt'
    });

    // we create > match queries
    BREAKPOINTS.push({
        alias: 'gt-' + BREAKPOINT_MILESTONE[ i ].alias as BreakpointAlias,
        mediaQuery: SCREEN + min(BREAKPOINT_MILESTONE[ i ].alias, 0.1),
        priority: startPriority.gt + (i + 1) * 100 + 1,
        overlapping: true,
        prefix: 'gt'
    });
}

 // console.log(BREAKPOINTS.sort((l, r) => l.priority - r.priority).map(b => ({ prio: b.priority, alias: b.alias, md: b.mediaQuery  })));
// console.log(BREAKPOINTS.map(b => ({ alias: b.alias, md: b.mediaQuery })));
// 1 === 1;
