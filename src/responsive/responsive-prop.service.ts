// import { distinctUntilChanged, takeUntil } from 'rxjs/internal/operators';
import { MediaQuery } from './media-query.service';
import { BaseService } from '../util';
import { BreakPoint, bpPrioritySort } from './breakpoints';
import { isDefined } from '@upradata/util';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';


interface ResponsiveProperty {
    prop: string;
    value: string;
    bp: BreakPoint;
    fallback?: boolean;
}

interface Listener<Value = any> {
    (prop: string, value: Value, bp: BreakPoint): any;
}

type PropertyName = string;
type Element = any; // HTMLElement;
type ResponsiveProps = { oldValue: string; props: ResponsiveProperty[]; };

export class ResponsiveProp extends BaseService {
    // List of sorted Responsive Properties
    private mapElementToResponsiveProps = new Map<Element, Map<PropertyName, ResponsiveProps>>();
    private mapElementToListener = new Map<Element, Map<PropertyName, Listener>>();

    private activatedBreakpoints: BreakPoint[]; // List of sorted activated breakpoints


    constructor(private mediaQuery: MediaQuery<string, string>) {
        super();
        this.listenToBreakpoint();
    }


    private listenToBreakpoint() {
        this.mediaQuery.mediaQuery$
            .pipe(
                debounceTime(100),
                distinctUntilChanged((mq1, mq2) => mq1.cssBpName === mq2.cssBpName),
                takeUntil(this.destroySubject)
            )
            .subscribe(_mediaQueryMatch => {
                this.activatedBreakpoints = Object.values(this.mediaQuery.breakpointMatchStates).filter(b => b.matches).map(b => b.bp).sort(bpPrioritySort);
                this.updateElements();
            });
    }

    private updateElements() {
        for (const [ element, propNameToresponsiveProps ] of this.mapElementToResponsiveProps) {

            for (const responsiveProps of propNameToresponsiveProps.values())
                this.updateProps(element, responsiveProps);

        }
    }

    private updateProps(element: HTMLElement, responsiveProps: ResponsiveProps) {
        const { oldValue, props } = responsiveProps;

        for (const responsiveProp of props) {
            const { bp } = responsiveProp;

            if (!bp.overlapping) {
                const activatedBp = this.activatedBreakpoints.find(b => b.alias === bp.alias);

                if (isDefined(activatedBp))
                    return this.callListener({ ...responsiveProp, element, oldValue });
            } else {
                const prefixedActivatedBps = this.activatedBreakpoints.filter(b => {
                    if (isDefined(bp.prefix))
                        return b.prefix === bp.prefix;

                    const prefix = bp.alias.match(/^.*-/);

                    if (prefix)
                        return b.alias.startsWith(prefix[ 0 ]);

                    return false;
                });


                // if the activated bp is higher (more specific) than property bp, we found the property
                if (prefixedActivatedBps.length > 0 && prefixedActivatedBps[ 0 ].priority >= bp.priority)
                    return this.callListener({ ...responsiveProp, element, oldValue });
            }
        }


        const fallbackProp = responsiveProps.props.find(p => p.fallback);

        if (fallbackProp)
            this.callListener({ ...fallbackProp, element, oldValue, bp: undefined });
    }

    private callListener(args: { element: HTMLElement; prop: string; value: any; oldValue: any; bp: BreakPoint; }) {
        const { element, prop, value, oldValue, bp } = args;

        if (value === oldValue)
            return;

        const listeners = this.mapElementToListener.get(element);

        if (isDefined(listeners)) {
            const listener = listeners.get(prop);

            if (isDefined(listener))
                listener(prop, value, bp);
        }

        this.mapElementToResponsiveProps.get(element).get(prop).oldValue = value;
    }

    public add<Value>(element: HTMLElement, propName: string, value: string, listener: Listener<Value>) {
        const responsivePropreties = this.makeSortedResponsiveProps(propName, value);

        const propNameToresponsiveProps = this.mapElementToResponsiveProps.get(element) || new Map<PropertyName, ResponsiveProps>();
        const responsiveProps = [];

        for (const responsiveProp of responsivePropreties) {
            // Add responsiveProp the element responsiveProps list
            responsiveProps.push(responsiveProp);
        }

        propNameToresponsiveProps.set(propName, { oldValue: undefined, props: responsiveProps });
        this.mapElementToResponsiveProps.set(element, propNameToresponsiveProps);


        if (responsivePropreties.length > 0) {
            const listeners = this.mapElementToListener.get(element) || new Map<PropertyName, Listener>();

            // Add listener the element property name
            listeners.set(propName, listener);
            this.mapElementToListener.set(element, listeners);
        }
    }


    private makeSortedResponsiveProps(propName: string, value: string): ResponsiveProperty[] {
        // value can be width="1000px; sm: 500px; lt-lg: 800px; gt-md: 900px"
        const props = value.split(';').map(s => s.trim());

        return props.map(p => {
            const propBp = p.match(/^(?:([a-z-]+)?\s*:)?\s*(.*)$/);
            // p.match(/^([a-z]+)-?(\w+)?\s*:\s*(.*)$/);  // prop can be width-sm 

            if (propBp === null)
                return undefined;

            const [ , bp, v ] = propBp;

            const fallbackBp = { priority: -Infinity, alias: 'mt/invalid-alias', mediaQuery: 'invalid' };
            const breakpoint = bp ? this.mediaQuery.breakpoints.find(b => b.alias === bp) : fallbackBp;

            if (bp && !breakpoint)
                return undefined;

            return { prop: propName, bp: breakpoint, value: v, fallback: !bp };
        }).filter(p => !!p).sort((a, b) => bpPrioritySort(a.bp, b.bp));
    }

}
