import { MediaQuery } from './media-query.service';
import { takeUntil } from 'rxjs/operators';
import { BaseService } from '../util';

export class AddResponsiveClasses extends BaseService {

    constructor(public services: { isMobile: boolean; mediaQuery: MediaQuery; }, public element: HTMLElement = document.body) {
        super();

        if (/complete|interactive|loaded/.test(document.readyState))
            this.addClasses();
        else
            document.addEventListener('DOMContentLoaded', () => this.addClasses(), { once: true, passive: false });
    }

    addClasses() {
        const { isMobile } = this.services;

        if (isMobile) this.element.classList.add('mt-is-mobile');

        this.addResponsiveLayoutClasses();
    }


    addResponsiveLayoutClasses() {
        const { mediaQuery } = this.services;

        mediaQuery.mediaQuery$.pipe(takeUntil(this.destroySubject)).subscribe(mediaQueryMatch => {
            if (mediaQueryMatch.matches)
                this.element.classList.add(mediaQueryMatch.cssBpName);
            else
                this.element.classList.remove(mediaQueryMatch.cssBpName);
        });
    }
}
