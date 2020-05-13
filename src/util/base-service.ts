import { Subject } from 'rxjs';

export class BaseService {
    protected destroySubject = new Subject<void>();

    constructor() { }

    destroy() {
        this.destroySubject.next();
        this.destroySubject.complete();
    }
}
