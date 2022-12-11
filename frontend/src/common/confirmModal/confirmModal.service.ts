import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ConfirmModalService {
      
    private subject = new Subject<any>();
    constructor(){}

    confirm(text: string, yesFunction: () => void, noFunction: () => void) {
        this.subject.next({
            text, yesFunction, noFunction
        })
    }

    close() {
        this.subject.next({text: null, yesFunction: null, noFunction: null})
    }

    getdata() {
        return this.subject.asObservable();
    }
}