import { ResponsiveProp } from '../responsive-prop.service';
import { findBpByAlias, LAYOUT_BREAKPOINTS } from '../responsive-breakpoints';



const bp = findBpByAlias;

class ResponsivePropInstance {
    instance: ResponsiveProp;

    constructor() {
        this.instance = new ResponsiveProp({ breakpoints: LAYOUT_BREAKPOINTS } as any);
    }

    updateElements(breakpoints: string[]) {
        this.instance[ 'activatedBreakpoints' ] = breakpoints.map(bp);
        this.instance[ 'updateElements' ]();
    };
}


describe('Test Suite ResponsiveProp', () => {
    const originalPrototype = {
        listenToBreakpoint: ResponsiveProp.prototype[ 'listenToBreakpoint' ]
    };

    const element = {};
    const width = 'fallback; sm: sm; lt-md: lt-md; gt-huge: gt-huge';


    beforeAll(() => {
        ResponsiveProp.prototype[ 'listenToBreakpoint' ] = jest.fn();
    });

    afterAll(() => {
        for (const [ k, v ] of Object.entries(originalPrototype))
            ResponsiveProp.prototype[ k ] = v;
    });

    it('should call the listener with "milestone" breakpoint', () => {

        const responsiveProp = new ResponsivePropInstance();

        responsiveProp.instance.add(element as any, 'width', width, (prop, value, breakpoint) => {
            expect({ prop, value, breakpoint }).toEqual({ prop: 'width', value: 'sm', breakpoint: bp('sm') });
        });

        responsiveProp.updateElements([ 'sm' ]);
    });

    it('should call the listener with mix of "milestone" and "range" breakpoints', () => {

        const responsiveProp = new ResponsivePropInstance();

        responsiveProp.instance.add(element as any, 'width', width, (prop, value, breakpoint) => {
            expect({ prop, value, breakpoint }).toEqual({ prop: 'width', value: 'sm', breakpoint: bp('sm') });
        });

        responsiveProp.updateElements([ 'sm', 'gt-sm', 'lt-sm', 'lt-md', 'lt-lg', 'lt-xl' ]);

        responsiveProp.instance.add(element as any, 'width', width, (prop, value, breakpoint) => {
            expect({ prop, value, breakpoint }).toEqual({ prop: 'width', value: 'lt-md', breakpoint: bp('lt-md') });
        });

        responsiveProp.updateElements([ 'md', 'gt-md', 'lt-md', 'lt-lg', 'lt-xl' ]);
    });

    it('should call the listener with with fallback value', () => {

        const responsiveProp = new ResponsivePropInstance();

        responsiveProp.instance.add(element as any, 'width', width, (prop, value, breakpoint) => {
            expect({ prop, value, breakpoint }).toEqual({ prop: 'width', value: 'fallback', breakpoint: undefined });
        });

        responsiveProp.updateElements([ 'prehuge', 'gt-prehuge' ]);
        responsiveProp.updateElements([ 'md', 'lt-lg', 'lt-xl' ]);
    });
});


// console.log((responsiveProp as any).makeSortedResponsiveProps('width', 'default; sm: sm; lt-md: lt-md; gt-xl: gt-xl'));
