import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    public loading = new BehaviorSubject<boolean>(false);
    public readonly loading$ = this.loading.asObservable();

    public show() {
        this.loading.next(true);
    }

    public hide() {
        this.loading.next(false);
    }
}
