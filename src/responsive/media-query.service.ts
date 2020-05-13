import { BreakpointObserver, BreakpointState } from './breakpoint-observer.service';
import { BreakPoint, BreakpointAlias, BreakpointAliasJs } from './responsive-breakpoints';
import { ReplaySubject, Observable } from 'rxjs';
import { takeUntil, shareReplay, debounceTime, filter } from 'rxjs/operators';
import { camelize } from '@upradata/util';
import { BaseService } from '../util';

export interface MediaQueryMatch<AliasCss = BreakpointAlias, AliasJs = BreakpointAliasJs> extends BreakpointState {
    bpName: AliasJs;
    cssBpName: AliasCss;
}

export type BreakpointsOf<K extends string, T> = { [ alias in K ]: T };


export class MediaQuery<AliasCss extends string = BreakpointAlias, AliasJs extends string = BreakpointAliasJs> extends BaseService {
    private mediaQuerySubject$ = new ReplaySubject<MediaQueryMatch<AliasCss, AliasJs>>(1);
    private subjectByMediaQuery$ = new Map<AliasJs, Observable<MediaQueryMatch<AliasCss, AliasJs>>>();
    private allBreakpointsLoaded$ = new ReplaySubject<void>(1);
    private _breakpointMatchStates: BreakpointsOf<AliasJs, { matches: boolean; bp: BreakPoint; }>;

    constructor(private breakpointObserver: BreakpointObserver, public breakpoints: BreakPoint[]) {
        super();
        this.initBreakpoints();
        this.initBreakpointObserve();
    }

    private initBreakpoints() {
        this._breakpointMatchStates = {} as any;

        for (const bp of this.breakpoints) {
            const mqSubject$ = this.mediaQuery$.pipe(
                filter(mq => (mq.cssBpName as unknown) === bp.alias),
                shareReplay(1)
            );

            this.subjectByMediaQuery$.set(camelize(bp.alias) as any, mqSubject$);
            mqSubject$.subscribe(); // triggers the first subscription to start the replay

            this._breakpointMatchStates[ camelize(bp.alias) ] = false;
        }

    }

    private initBreakpointObserve() {

        for (const [ i, bp ] of Object.entries(this.breakpoints)) {
            // Services are created before Components.
            // So breakpointObserver will emit all the mediaQuery before any subscription from
            // Components and the will just get the last one emitted as mediaQuerySubject$ is a ReplaySubject(1)
            // With debounceTime(0), the emition will happens at the next tick after all Components have been initialized
            this.breakpointObserver.observe(
                bp.mediaQuery
            ).pipe(
                debounceTime(0),
                takeUntil(this.destroySubject)
            ).subscribe(result => {
                this._breakpointMatchStates[ camelize(bp.alias) ] = {
                    matches: result.matches,
                    bp
                };

                this.mediaQuerySubject$.next({ ...result, bpName: camelize(bp.alias) as any, cssBpName: bp.alias as any });

                if (parseInt(i) === this.breakpoints.length - 1)
                    this.allBreakpointsLoaded$.next();
            });
        }
    }

    get allBreakpointsLoaded() {
        return this.allBreakpointsLoaded$.asObservable();
    }

    get mediaQuery$() {
        return this.mediaQuerySubject$.asObservable();
    }

    mediaQueryByAlias$(aliasJs: AliasJs) {
        return this.subjectByMediaQuery$.get(aliasJs);
    }

    get breakpointMatchStates() {
        return this._breakpointMatchStates;
    }
}
