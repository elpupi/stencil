import { ResponsiveProp, LAYOUT_BREAKPOINTS, bpPrioritySort, findBpByAlias } from '..';
// import { LAYOUT_BREAKPOINTS, findBpByAlias } from '../responsive-breakpoints';

// console.log(LAYOUT_BREAKPOINTS.filter(b => b.alias.startsWith('lt-')));
(ResponsiveProp.prototype as any).listenToBreakpoint = () => { };

const responsiveProp = new ResponsiveProp({ breakpoints: LAYOUT_BREAKPOINTS } as any);

const element = {};

// console.log((responsiveProp as any).makeSortedResponsiveProps('width', 'default; sm: sm; lt-md: lt-md; gt-xl: gt-xl'));

responsiveProp.add(element as any, 'width', 'default; sm: sm; lt-md: lt-md; gt-xl: gt-xl', (prop, value, bp) => {
    console.log({ prop, value, bp: bp ? bp.alias : 'fallback' });
});


console.log('LAYOUT_BREAKPOINTS');
console.log(LAYOUT_BREAKPOINTS.sort(bpPrioritySort).map(b => ({ bp: b.alias, priortiy: b.priority })));

const bp = findBpByAlias;

console.log('11111');
(responsiveProp as any).activatedBreakpoints = [ bp('sm') ];
(responsiveProp as any).updateElements();


console.log('222222');
(responsiveProp as any).activatedBreakpoints = [ 'sm', 'gt-sm', 'lt-sm', 'lt-md', 'lt-lg', 'lt-xl' ].map(bp);
(responsiveProp as any).updateElements();

console.log('33333');
(responsiveProp as any).activatedBreakpoints = [ 'md', 'gt-md', 'lt-md', 'lt-lg', 'lt-xl' ].map(bp);
(responsiveProp as any).updateElements();

console.log('44444');
(responsiveProp as any).activatedBreakpoints = [ 'prehuge', 'gt-prehuge' ].map(bp);
(responsiveProp as any).updateElements();

1 === 1;
