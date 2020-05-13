import { ensureArray } from '@upradata/util';
import { combineLatest, Observable, fromEventPattern, asapScheduler } from 'rxjs';
import { debounceTime, map, startWith, takeUntil } from 'rxjs/operators';
import { BaseService } from '../util';


/** The current state of a layout breakpoint. */
export interface BreakpointState {
    /** Whether the breakpoint is currently matching. */
    matches: boolean;
    /**
     * A key boolean pair for each query provided to the observe method,
     * with its current matched state.
     */
    breakpoints: {
        [ key: string ]: boolean;
    };
}

/** The current state of a layout breakpoint. */
interface InternalBreakpointState {
    /** Whether the breakpoint is currently matching. */
    matches: boolean;
    /** The media query being to be matched */
    query: string;
}

interface Query {
    observable: Observable<InternalBreakpointState>;
    mql: MediaQueryList;
}


/** Utility for checking the matching state of @media queries. */
export class BreakpointObserver extends BaseService {
    /**  A map of all media queries currently being listened for. */
    private _queries = new Map<string, Query>();

    constructor() {
        super();
    }


    /**
     * Whether one or more media queries match the current viewport size.
     * @param value One or more media queries to check.
     * @returns Whether any of the media queries match.
     */
    isMatched(value: string | string[]): boolean {
        const queries = splitQueries(ensureArray(value));
        return queries.some(mediaQuery => this._registerQuery(mediaQuery).mql.matches);
    }

    /**
     * Gets an observable of results for the given queries that will emit new results for any changes
     * in matching of the given queries.
     * @param value One or more media queries to check.
     * @returns A stream of matches for the given queries.
     */
    observe(value: string | string[]): Observable<BreakpointState> {
        const queries = splitQueries(ensureArray(value));
        const observables = queries.map(query => this._registerQuery(query).observable);

        return combineLatest(observables).pipe(
            debounceTime(0, asapScheduler),
            map((breakpointStates: InternalBreakpointState[]) => {
                const response: BreakpointState = {
                    matches: false,
                    breakpoints: {},
                };
                breakpointStates.forEach((state: InternalBreakpointState) => {
                    response.matches = response.matches || state.matches;
                    response.breakpoints[ state.query ] = state.matches;
                });
                return response;
            }));
    }

    /** Registers a specific query to be listened for. */
    private _registerQuery(query: string): Query {
        // Only set up a new MediaQueryList if it is not already being listened for.
        if (this._queries.has(query)) {
            return this._queries.get(query)!;
        }

        const mql: MediaQueryList = window.matchMedia(query);

        // Create callback for match changes and add it is as a listener.
        const queryObservable = fromEventPattern<MediaQueryList>(
            (listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any) => mql.addListener(listener),
            (listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any) => mql.removeListener(listener))
            .pipe(
                startWith(mql),
                map((nextMql: MediaQueryList) => ({ query, matches: nextMql.matches })),
                takeUntil(this.destroySubject)
            );

        // Add the MediaQueryList to the set of queries.
        const output = { observable: queryObservable, mql };
        this._queries.set(query, output);

        return output;
    }
}

/**
 * Split each query string into separate query strings if two queries are provided as comma
 * separated.
 */
function splitQueries(queries: string[]): string[] {
    return queries.map((query: string) => query.split(','))
        .reduce((a1: string[], a2: string[]) => a1.concat(a2))
        .map(query => query.trim());
}
